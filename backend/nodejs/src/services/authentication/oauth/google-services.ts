// https://developers.google.com/identity/protocols/oauth2/web-server

import { Request, Response } from "express";
import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config({ path: path.join(path.resolve(), '..', '..','.env') });

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;
const BASE_URI = `http://${HOST}:${PORT}`;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

async function oauthWithGoogle(_req: Request, res: Response) {
    const options = {
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: `${BASE_URI}/login/oauth/google/callback`,
        response_type: "code",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    const search_params = new URLSearchParams(options);

    res.redirect(
        `https://accounts.google.com/o/oauth2/v2/auth?${search_params}`,
    );
} 

async function oauthWithGoogleCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    try {
        const token = await getAccessToken(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, code);
        const user = await getGoogleUser(token.id_token, token.access_token);
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
    try {
        const res = await axios({
            url: "https://oauth2.googleapis.com/token",
            method: "post",
            headers: { accept: "application/json" },
            data: {
              client_id: client_id,
              client_secret: client_secret,
              redirect_uri: `${BASE_URI}/login/oauth/google/callback`,
              code: code,
              grant_type: 'authorization_code'
            }
        });
        return res.data;
    } catch(err) {
        throw new Error(err);
    }
}

async function getGoogleUser(id_token: string, access_token: string) {
    try {
        const user = await axios({
            url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            method: "get",
            headers: { Authorization: `Bearer ${id_token}` },
        });
        return user.data;
    } catch(err) {
        throw new Error(err); 
    }
}

const services = {
    oauthWithGoogle: oauthWithGoogle,
    oauthWithGoogleCallback: oauthWithGoogleCallback,
}

export default services;
