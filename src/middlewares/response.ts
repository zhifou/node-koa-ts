/**
 * @file: response.ts
 */

import Koa from 'koa';
import {ComposedMiddleware} from 'koa-compose';
import log from '../utils/log';
import {TStatus, TResponse} from '../types/index';

const SUCCESS_METHOD = 'success';
const makeRespond = (): Function => {
    return (ctx: Koa.Context, method: string, status: number,  payload: any): Koa.Context => {
        const resBody: TResponse = {
            status: 0,
            message: {},
            data: payload
        };
        ctx.status = status;
        if (payload === undefined) {
            return ctx;
        }
        if (method !== SUCCESS_METHOD) {
            resBody.status = 1;
            resBody.message = payload;
            resBody.data = {};
        }

        ctx.body = resBody;
        // Output log and record time-consuming
        const timeUsed = Date.now() - ctx.accessTime;
        log.access({ctx, message: `output:${timeUsed}`});
        return ctx;
    };
};

/**
 * Maps method names to status codes.
 * default http status is 200, res.code 0(ok) 1(error)
 */
const statusCodeMap: TStatus = {
    success: 200,
    badRequest: 200,
    notFound: 404,
    internalServerError: 500
};

/**
 * Makes the respond middleware. All options are optional.
 */
const makeRespondMiddleware = (): ComposedMiddleware<Koa.Context> => {
    // Make the respond function.
    const respond = makeRespond();
    const bindMethodToCtx = (ctx: Koa.Context): Koa.Context => {
        const statusMethods = Object.assign({}, statusCodeMap);
        ctx.send = respond.bind(ctx, ctx);

        // Bind status methods.
        for (const method in statusMethods) {
            const code = statusMethods[method];
            ctx[method] = respond.bind(ctx, ctx, method, code);
        }

        return ctx;
    };

    const respondMiddleware = (ctx: Koa.Context, next: Function) => {
        bindMethodToCtx(ctx);
        return next();
    };

    return respondMiddleware;
};

export default makeRespondMiddleware;

