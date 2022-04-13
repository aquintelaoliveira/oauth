// https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow

import { Request, Response } from "express";
import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config({ path: path.join(path.resolve(), '..', '..','.env') });

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;
const BASE_URI = `http://${HOST}:${PORT}`;

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID!;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET!;

async function oauthWithFacebook(_req: Request, res: Response) {
    const options = {
        client_id: FACEBOOK_APP_ID,
        redirect_uri: `${BASE_URI}/login/oauth/facebook/callback`,
    }
    
    const search_params = new URLSearchParams(options);
    
    res.redirect(
    `https://www.facebook.com/dialog/oauth?${search_params}`,
    );
} 

async function oauthWithFacebookCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    try {
        const token = await getAccessToken(FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, code);
        const user = await getFacebookUser(token.access_token);
        if (user) {
            res.send(user);
        } else {
            res.send("Login did not succeed!");
        }
    } catch(err) {
        res.status(500).json({ err: err.message });
    }
}

async function getAccessToken(client_id: string, client_secret: string, code: string) {
    const options = {
        client_id: client_id,
        redirect_uri: `${BASE_URI}/login/oauth/facebook/callback`,
        client_secret: client_secret,
        code: code,
        scope: ["email", "public_profile"].join(",")
    }
    
    const search_params = new URLSearchParams(options);

    const res = await axios({
        url: `https://graph.facebook.com/oauth/access_token?${search_params}`,
        method: "get",
    })
    return res.data;
}

async function getFacebookUser(access_token: string) {
    try {
        const user = await axios({
            url: "https://graph.facebook.com/me?fields=id,name,email ",
            method: "get",
            headers: { Authorization: `Bearer ${access_token}` },
        });
        return user.data;
    } catch(err) {
        throw new Error(err); 
    }
}

const services = {
    oauthWithFacebook: oauthWithFacebook,
    oauthWithFacebookCallback: oauthWithFacebookCallback,
}

export default services;
