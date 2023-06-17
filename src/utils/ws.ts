import Koa from "koa";
import WebSocket, { WebSocketServer } from "ws";
// utils/ws.js
const WebSocketApi = (wss: WebSocketServer, app: Koa) => {
    wss.on("connection", (ws: WebSocket, req: any) => {
        console.log("连接成功");

        ws.on("message", function message(data, isBinary) {
            console.log(`Received message ${data}`);
            console.log(wss.clients);
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(data, { binary: isBinary });
                }
            });
        });
    });
};

export default WebSocketApi;
