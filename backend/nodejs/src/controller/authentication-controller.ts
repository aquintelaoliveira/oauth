import { Request, Response } from "express";
import authentication from "../services/authentication/authentication-services";
import google from "../services/authentication/oauth/google-services";
import github from "../services/authentication/oauth/github-services";
import facebook from "../services/authentication/oauth/facebook-services";

const signin = async (_req: Request, _res: Response) => {
    authentication.signin();
}

interface LoginInput {
    username: string
    password: string
}

const login = async (req: Request, res: Response) => {
        const { username, password } : LoginInput = req.body;
        const user = authentication.login(username, password);

        if(!user) {
            return res.status(401).send("Invalid email or password");
        }

        return res.status(200).send("login ok");
}

const logout = async (_req: Request, _res: Response) => {
    authentication.logout();
}

const oauthWithGoogle = async (req: Request, res: Response) => {
    google.oauthWithGoogle(req, res);
}

const oauthWithGoogleCallback = async (req: Request, res: Response)=> {
    google.oauthWithGoogleCallback(req, res);
}

const oauthWithGithub = async (req: Request, res: Response)=> {
    github.oauthWithGithub(req, res);
}

const oauthWithGithubCallback = async (req: Request, res: Response) => {
    github.oauthWithGithubCallback(req, res);
}

const oauthWithFacebook = async (req: Request, res: Response) => {
    facebook.oauthWithFacebook(req, res);
}

const oauthWithFacebookCallback = async (req: Request, res: Response) => {
    facebook.oauthWithFacebookCallback(req, res);
}

const controllers = {
    signin: signin,
    login: login,
    logout: logout,
    oauthWithGoogle: oauthWithGoogle,
    oauthWithGoogleCallback: oauthWithGoogleCallback,
    oauthWithGithub: oauthWithGithub,
    oauthWithGithubCallback: oauthWithGithubCallback,
    oauthWithFacebook: oauthWithFacebook,
    oauthWithFacebookCallback: oauthWithFacebookCallback
}

export default controllers;