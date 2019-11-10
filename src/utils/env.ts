/**
 * @file env
 */

import yargs from 'yargs';

export const args = yargs.option('i', {
    alias: 'address',
    default: '0.0.0.0',
    describe: 'listen address',
    type: 'string'
}).option('p', {
    alias: 'port',
    default: 8848,
    describe: 'listen port',
    type: 'number'
}).option('log-path', {
    alias: 'logPath',
    default: './log',
    describe: 'log path',
    type: 'string'
}).option('env', {
    default: 'offline',
    describe: 'runtime environment',
    choices: ['offline', 'preonline', 'online']
}).help('h').argv;

