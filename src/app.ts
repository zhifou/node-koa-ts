/**
 * @author: packjs
 * @file: app.ts
 */
import Koa from 'koa';

import bodyParser from 'koa-bodyparser';
import router from './routes';
import response from './middlewares/response';
import log from './utils/log';

// Create Koa server
const app = new Koa();

// Koa configuration
// Json limit
app.use(bodyParser({jsonLimit: '10mb', formLimit: '10mb'}));

// response handler
app.use(response());

// Router handler
app.use(router.routes());

// App error handler
app.on('error', (err, ctx) => {
    log.error({ctx, message: `${JSON.stringify(err)}`});
});

export default app;
