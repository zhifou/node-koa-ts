/**
 * @author: packjs
 * @file: index.ts
 */
import fs from "fs";
import https from "https";
import WebSocket, { WebSocketServer } from "ws";
import app from "./app";

import * as env from "./utils/env";
import WebSocketApi from "./utils/ws";

// SSL options
const options = {
    key: fs.readFileSync("./src/ssl/ssl.key"),
    cert: fs.readFileSync("./src/ssl/ssl.pem"),
};

/**
 * Start koa server.
 */
const server = app.listen(env.args.p, env.args.i, () => {
    console.log("service started at port: " + env.args.port, {
        app: "node-typescript service",
    });
});

https.createServer(options, app.callback()).listen(443);

// const server = https.createServer(app.callback());
const wss: WebSocketServer = new WebSocket.Server({ server });

WebSocketApi(wss, app);

console.log(`Server Start => HTTP:${env.args.port} => HTTPS:443......`);
export default server;
