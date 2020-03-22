/**
 * @file 类装饰器声明
 * @author zhaoyadong
 */
import {IConstructable} from '../types/index';

export function classDecorator<T extends IConstructable> (constrctor: T) {
    return class extends constrctor {
        newProperty = 'new property';
        hello = 'override';
    };
}