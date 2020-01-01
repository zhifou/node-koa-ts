/**
 * @file config.ts
 */

import config from 'config';
import {TResponse} from '../types/index';

export const healthPath: string = config.get('path.health');
export const errors: TResponse['message'] = config.get('response.errors');
