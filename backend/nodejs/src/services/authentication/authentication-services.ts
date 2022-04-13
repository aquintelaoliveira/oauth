//import sessionServices from "./session-services";
import userServices from "../user/user-services";

async function signin() {

}

async function login(username: string, password: string) {
    try {
        const user = await userServices.getUser(username);
    
        if(user.password !== password) {
            return null;
        }

        return user;
    } catch(err) {
        throw new Error(err);
    }

} 

async function logout() {
  
} 

const services = {
    signin: signin,
    login: login,
    logout:logout
}

export default services;