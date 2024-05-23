/**
 * @author: packjs
 * @file: app.ts
 */
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import enforceHttps from "koa-sslify";
import jwt from "jsonwebtoken";
import jwtKoa from "koa-jwt";

import router from "./routes";
import response from "./middlewares/response";
import log from "./utils/log";

// Create Koa server
const app = new Koa();

// jwt secret
const secret = "jwt demo";

// 使用jwtKoa验证
app.use(
    jwtKoa({ secret }).unless({
        path: [/^\/api\/login/], // 数组中的路径不需要通过jwt验证
    })
);
// app.js

// Koa configuration
// Json limit
app.use(bodyParser({ jsonLimit: "10mb", formLimit: "10mb" }));

app.use(
    cors({
        origin: function (ctx) {
            // 设置允许来自指定域名请求
            if (ctx.url === "/test") {
                return "*"; // 允许来自所有域名请求
            }
            return "http://localhost:8080"; // 只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
        credentials: true, // 是否允许发送Cookie
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 设置所允许的HTTP请求方法
        allowHeaders: ["Content-Type", "Authorization", "Accept"], // 设置服务器支持的所有头信息字段
        exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], // 设置获取其他自定义字段
    })
);

// response handler
app.use(response());

// Router handler
app.use(router.routes());

// Force HTTPS using default resolver
// 使用默认解析强制使用 HTTPS
app.use(
    enforceHttps({
        port: 443,
    })
);

// App error handler
app.on("error", (err, ctx) => {
    log.error({ ctx, message: `${JSON.stringify(err)}` });
});

export default app;
