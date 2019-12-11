/**
 * @file: other.ts
 */

import Koa from 'koa';
import DateTime from 'xdatetime';
import * as log from '../utils/log';

/**
 * GET /other/get
 * Check server health.
 */
export const otherGet = async (ctx: Koa.Context, next: Function) => {
    const dt: DateTime = new DateTime(new Date());
    console.log('console:::::', dt.toString());
    log.access.info(new DateTime().addDays(1).toString('yyyy-MM-dd'));
    ctx.success({ctx, message: 'get'});
    await next();
};

/**
 * GET /other/post
 * Check server health.
 */
export const otherPost = async (ctx: Koa.Context, next: Function) => {
    ctx.success({ctx, message: 'post'});
    await next();
};