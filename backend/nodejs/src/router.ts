import { Router } from 'express';

export default (router: Router, controller: any) => {

    // common login
    router.post('/signin', controller.authentication.signin);
    router.post('/login',  controller.authentication.login);
    router.delete('/logout', controller.authentication.logout);

    // google oauth login
    router.get('/login/oauth/google', controller.authentication.oauthWithGoogle);
    router.get('/login/oauth/google/callback', controller.authentication.oauthWithGoogleCallback);
    // github oauth login
    router.get('/login/oauth/github', controller.authentication.oauthWithGithub);
    router.get('/login/oauth/github/callback', controller.authentication.oauthWithGithubCallback);
    // facebook oauth login
    router.get('/login/oauth/facebook', controller.authentication.oauthWithFacebook);
    router.get('/login/oauth/facebook/callback', controller.authentication.oauthWithFacebookCallback);

    // users
    router.get('/users', controller.users.getAllUsers);
    router.get('/users/me', controller.users.getMe);

    return router;
}
