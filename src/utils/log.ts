/**
 * @file 日志类
 */
import Koa from 'koa';
import {access, error, performance, debug, warn, info} from './winston';
import * as winston from 'winston';
import {LeveledLogMethod} from 'winston';

class Log {

    // 单例实现，类加载时就初始化
    private static instance = new Log();

    private constructor() {}

    static getInstance(): Log {
        return Log.instance;
    }

    private buildArgs(args: any[]): string {
        let ret: string = '';
        if (args && args.length) {
            const newArgs = args.map(o => {
                let item: any = o;
                if (o instanceof Error) {
                    item = {
                        message: o.message,
                        stack: o.stack
                    };
                }
                return JSON.stringify(item);
            });
            ret = newArgs.join(',');
        }
        return ret;
    }

    private checkArgs(logger: winston.Logger, methodName: string, args: any[]) {
        if (!args || !args.length) return;
        let method: LeveledLogMethod = logger.info;
        switch (methodName) {
            case 'info':
                method = logger.info;
                break;
            case 'warn':
                method = logger.warn;
                break;
            case 'error':
                method = logger.error;
                break;
            default:
                method = logger.info;
        }
        const ctx = args[0];
        if (ctx && ctx.request && ctx.response && ctx.cookies && ctx.session) {
            args.shift();
            const msg = this.buildArgs(args);
            method({ctx: ctx, message: msg});
        } else {
            const msg = this.buildArgs(args);
            method({ctx: undefined, message: msg});
        }
    }


    debug(...args: any[]) {
        return this.checkArgs(debug, 'info', args);
    }
    access(...args: any[]) {
        return this.checkArgs(access, 'info', args);
    }
    info(...args: any[]) {
        return this.checkArgs(info, 'info', args);
    }
    warn(...args: any[]) {
        return this.checkArgs(warn, 'warn', args);
    }
    error(...args: any[]) {
        return this.checkArgs(error, 'error', args);
    }
    performance(...args: any[]) {
        return this.checkArgs(performance, 'info', args);
    }
}

// const singleton1 = Log.getInstance();
// const singleton2 = Log.getInstance();
// console.log('log instance:', singleton1 === singleton2); // true

export default Log.getInstance();
