// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps

import { Request, Response } from "express";
import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config({ path: path.join(path.resolve(), '..', '..','.env') });

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;
const BASE_URI = `http://${HOST}:${PORT}`;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

async function oauthWithGithub(_req: Request, res: Response) {
  const options = {
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `${BASE_URI}/login/oauth/github/callback`
  }

  const search_params = new URLSearchParams(options);

  res.redirect(
    `https://github.com/login/oauth/authorize?${search_params}`,
  );
} 

async function oauthWithGithubCallback(req: Request, res: Response) {
  const code = req.query.code as string;
  try {
      const token = await getAccessToken(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, code);
      const user = await getGithubUser(token.access_token);
      if (user) {
          res.send(user);
      } else {
          res.send("Login did not succeed!");
      }
  } catch(err) {
    res.status(500).json({ err: err.message });
  }
}

async function getAccessToken(client_id: string, client_secret: string , code: string) {
  try {
    const res = await axios({
        url: "https://github.com/login/oauth/access_token",
        method: "post",
        headers: { accept: "application/json" },
        data: {
          client_id: client_id,
          client_secret: client_secret,
          code: code,
        }
    });
    return res.data;
  } catch(err) {
      throw new Error(err);
  }
}

async function getGithubUser(access_token: string) {
  try {
    const user = await axios({
        url: "https://api.github.com/user",
        method: "get",
        headers: { Authorization: `token ${access_token}` },
    });
    return user.data;
  } catch(err) {
      throw new Error(err); 
  }
}

const services = {
  oauthWithGithub: oauthWithGithub,
  oauthWithGithubCallback: oauthWithGithubCallback,
}

export default services;