/**
 * @file: other.ts
 */

import Koa from 'koa';

/**
 * GET /other/get
 * Check server health.
 */
export const otherGet = async (ctx: Koa.Context, next: Function) => {
    ctx.success({ctx, message: 'post'});
    await next();
};

/**
 * GET /other/post
 * Check server health.
 */
export const otherPost = async (ctx: Koa.Context, next: Function) => {
    ctx.success({ctx, message: 'get'});
    await next();
};