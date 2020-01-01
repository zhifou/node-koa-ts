/**
 * @file logger
 * @author lijia19
 */

import winston from 'winston';
import * as path from 'path';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import {TransformableInfo} from 'logform';
import WsTransport from 'winston-transport';
import * as env from './env';
const format = winston.format;
const {combine} = format;

// create log file
const logDir: string = env.args.log;

// define log transports
interface Transports {
    [key: string]: WsTransport;
}
const trans: Transports = {
    console: new winston.transports.Console({
        level: 'debug'
    }),
    performance: new WinstonDailyRotateFile({
        filename: path.resolve(logDir + '/performance', 'performance.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'info',
        // keep this log for a week
        maxFiles: '3d'
    }),
    access: new WinstonDailyRotateFile({
        filename: path.resolve(logDir + '/access', 'access.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'info',
        // keep this log for a week
        maxFiles: '3d'
    }),
    info: new WinstonDailyRotateFile({
        filename: path.resolve(logDir + '/info', 'info.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'info',
        // keep this log for a week
        maxFiles: '7d'
    }),
    error: new WinstonDailyRotateFile({
        filename: path.resolve(logDir + '/error', 'error.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'error',
        // keep this log for a week
        maxFiles: '14d'
    }),
    debug: new WinstonDailyRotateFile({
        filename: path.resolve(logDir + '/debug', 'debug.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'debug',
        // keep this log for a week
        maxFiles: '2d'
    }),
    warn: new WinstonDailyRotateFile({
        filename: path.resolve(logDir + '/warn', 'warn.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'warn',
        // keep this log for a week
        maxFiles: '7d'
    })
};


// define log Categories
interface Category {
    [key: string]: Array<string>;
}
interface Categories {
    [key: string]: Category;
}
const categories: Categories = {
    debug: {
        trans: ['console', 'debug']
    },
    info: {
        trans: ['console', 'info']
    },
    access: {
        trans: ['console',  'access']
    },
    performance: {
        trans: ['console',  'performance']
    },
    error: {
        trans: ['console',  'error']
    },
    warn: {
        trans: ['console',  'warn']
    }
};

/**
 * 自定义日志format
 * @param info
 */

const customFormat = (info: TransformableInfo): string => {
    const {ctx, message, timestamp} = info;
    const {ip = '', path = '', method = '', request = {}, body = '-'} = ctx || {};
    const {requestId = '-', userId = '-', params = '-'} = request.body || {};
    return `${timestamp} [${requestId}] [${ip}:${method}:${path}] [${message}] [${userId}:${params}] `
        + `[${JSON.stringify(body)}]`;
};

for (const key in categories) {
    const item: Category = categories[key];

    winston.loggers.add(key, {
        format: combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(customFormat)
        ),
        transports: item['trans'].map( (value, index) => {
            return trans[value];
        })
    });
}

export const loggers = winston.loggers;
export const debug = winston.loggers.get('debug');
export const access = winston.loggers.get('access');
export const performance = winston.loggers.get('performance');
export const error = winston.loggers.get('error');
export const info = winston.loggers.get('info');
export const warn = winston.loggers.get('warn');
export {winston};
