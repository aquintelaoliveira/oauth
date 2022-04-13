import { User }from "../../mongoose-models/user-model";

const createUser = async (username: string, password: string) => {
    const userModel = new User({
        username: username,
        password: password
    });

    try {
        const user = await userModel.save();
        console.log("save", user)
    } catch(err) {
        throw new Error(err);
    }
}

const getUser = async (username: string) => {
    try {
        const user = await User.findOne({
            username: username
        });
        return user;
    } catch(err) {
        throw new Error(err);
    }
}

const updateUser = async () => {

}

const deleteUser = async () => {

}

const getMe = async (session: string) => {
    try {
        const user = await User.findOne({
            username: session //session.user
        });
        return user;
    } catch(err) {
        throw new Error(err);
    }
}

const getAllUsers = async () => {
    try {
        const user = await User.find();
        return user;
    } catch(err) {
        throw new Error(err);
    }
}

const services = {
    createUser: createUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getMe: getMe,
    getAllUsers: getAllUsers,
}

export default services;