/**
 * @file logger
 */

import config from 'config';
import winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import {TransformableInfo} from 'logform';
import WsTransport from 'winston-transport';
import * as env from './env';
const format = winston.format;
const {combine} = format;

// create log file
const logDir: string = env.args['log-path'];

// define log transports
interface Transports {
    [key: string]: WsTransport;
}
const trans: Transports = {
    console: new winston.transports.Console({
        level: 'debug'
    }),
    performance: new WinstonDailyRotateFile({
        filename: path.resolve(logDir, 'performance.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'debug',
        // keep this log for a week
        maxFiles: '7d'
    }),
    access: new WinstonDailyRotateFile({
        filename: path.resolve(logDir, 'access.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'info',
        // keep this log for a week
        maxFiles: '7d'
    }),
    output: new WinstonDailyRotateFile({
        filename: path.resolve(logDir, 'output.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'info',
        // keep this log for a week
        maxFiles: '7d'
    }),
    error: new WinstonDailyRotateFile({
        filename: path.resolve(logDir, 'error.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'info',
        // keep this log for a week
        maxFiles: '7d'
    }),
    debug: new WinstonDailyRotateFile({
        filename: path.resolve(logDir, 'debug.log'),
        datePattern: 'YYYY-MM-DD-HH',
        level: 'info',
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
    output: {
        trans: ['console', 'debug', 'output']
    },
    access: {
        trans: ['console',  'debug', 'access']
    },
    performance: {
        trans: ['console',  'debug', 'performance']
    },
    error: {
        trans: ['console',  'debug', 'error']
    }
};

/**
 * 自定义日志format
 * @param info
 */

const customFormat = (info: TransformableInfo): string => {
    const {ctx, message, timestamp} = info;
    const {ip, path, method, request, body = '-'} = ctx;
    const {requestId = '-', userId = '-', params = '-'} = request.body;
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
        transports: item['trans'].map((value, index) => {
            return trans[value];
        })
    });
}

export const loggers = winston.loggers;
export const debug = winston.loggers.get('debug');
export const access = winston.loggers.get('access');
export const performance = winston.loggers.get('performance');
export const error = winston.loggers.get('error');
export const output = winston.loggers.get('output');
export {winston};
