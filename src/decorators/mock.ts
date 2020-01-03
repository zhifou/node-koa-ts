/**
 * @file mock数据注解器，用于方法的本地mock数据
 */
import log from '../utils/log';
import * as env from '../utils/env';

export function mock(data: any): any {

    return (target: any, propertyKey: string, descriptor?: PropertyDescriptor) => {

        if (!propertyKey) {
            return;
        }
        // 对方法进行装饰
        const originMethod = descriptor.value;
        descriptor.value = (...args: any[]) => {
            console.log('Mock装饰方法-before');
            let result;
            if (env.args.env === 'default') {
                result = data;
            } else {
                result = originMethod.apply(target, args);
            }
            console.log('Mock装饰方法-after');
            return result;
        };

        return descriptor;
    };
}
