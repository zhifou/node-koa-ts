/**
 * @author: packjs
 * @file: index.ts
 */

import app from './app';
import * as env from './utils/env';

/**
 * Start koa server.
 */
const server = app.listen(env.args.p, env.args.i, () => {
    console.log('service started at port: ' + env.args.port, {app: 'node-typescript service'});
});

export default server;
