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
}).option('log', {
    alias: 'logPath',
    default: './logs',
    describe: 'log path',
    type: 'string'
}).option('env', {
    default: 'default',
    describe: 'runtime environment',
    choices: ['default', 'offline', 'preonline', 'online']
}).help('h').argv;

