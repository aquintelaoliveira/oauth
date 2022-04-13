import SessionModel from "../../mongoose-models/session-model";

const createSession = async () => {

    const sessionModel = new SessionModel({
        uuid: "uuidv4()",
        username: "username"
    });

    try {
        const session = await sessionModel.save();
        console.log("create", session)
        return session;
    } catch(err) {
        throw Error("session");
    }
}

const getSession = async (id: string) => {
    try {
        const session = await SessionModel.findById({ id: id });
        console.log("get", session)
        return session;
    } catch(err) {
        throw Error(err);
    }
}
  
const deleteSession = async (id: string) => {
    try {
        const session = await SessionModel.findByIdAndDelete({ id: id });
        console.log("delete", session)
    } catch(err) {
        throw Error(err);
    }
}

const services = {
    createSession: createSession,
    getSession: getSession,
    deleteSession: deleteSession
}

export default services;
