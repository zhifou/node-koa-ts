/**
 * @file: health.ts
 */

import Koa from 'koa';

/**
 * GET /health
 * Check server health.
 */
export const health = async (ctx: Koa.Context, next: Function) => {
    ctx.success('ok');
    await next();
};
