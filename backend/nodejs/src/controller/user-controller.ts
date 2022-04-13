import { Request, Response } from "express";
import user from '../services/user/user-services';

const getMe = async (_req: Request, res: Response)  => {
    const me = await user.getMe("user1");
    res.send(me);
}

const getAllUsers = async (_req: Request, res: Response)  => {
    const users = await user.getAllUsers();
    res.send(users);
}

const controllers = {
    getMe: getMe,
    getAllUsers: getAllUsers,
}

export default controllers;