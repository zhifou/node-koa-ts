/**
 * @author: packjs
 * @file: index.ts
 */

import app from './app';
import fs from 'fs';
import https from 'https';
import * as env from './utils/env';

// SSL options
const options = {
    key: fs.readFileSync('./src/ssl/ssl.key'),
    cert: fs.readFileSync('./src/ssl/ssl.pem')
};

/**
 * Start koa server.
 */
const server = app.listen(env.args.p, env.args.i, () => {
    console.log('service started at port: ' + env.args.port, {app: 'node-typescript service'});
});

https.createServer(options, app.callback()).listen(443);
console.log(`Server Start => HTTP:${env.args.port} => HTTPS:443......`);
export default server;
