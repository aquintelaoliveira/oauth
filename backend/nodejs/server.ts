import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./src/graphql-schemas/user/user-resolver"

import db_connect from "./src/database";

import controller from "./src/controller/controller";
import router from "./src/router";

dotenv.config({ path: path.join(path.resolve(), "..", "..",".env") });

const HOST = process.env.SERVER_HOST!;
const PORT = process.env.SERVER_PORT!;
const FRONTEND_PUBLIC_DIR = path.join(path.resolve(), "..", "..", "frontend", "public");

(async () => {

    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(FRONTEND_PUBLIC_DIR));
    app.use(router(express.Router(), controller));

    // Additional middleware can be mounted at this point to run before Apollo.
    // app.use('*', jwtCheck, requireAuth, checkScope);
    // app.use(deserializeUser);

    app.get('/', (_, res) => {
      res.sendFile(path.join(FRONTEND_PUBLIC_DIR, 'index.html'));
    });

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver]
      }),
      context: ({ req, res }) => ({ req, res })
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    db_connect()
      .then(() => {
          app.listen(process.env.SERVER_PORT, 
            () => console.log(`🚀 Server ready and listening at ==> ${HOST}:${PORT}`));
      });

})();



