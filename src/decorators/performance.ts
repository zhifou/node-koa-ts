/**
 * @file 方法性能装饰器声明
 * @author zhaoyadong
 */
import DateTime from 'xdatetime';

export function performance() {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
        const method = descriptor.value;
        const className = (target.constructor || {}).name;
        descriptor.value = function (...args: any[]) {
            // 记录方法执行前时间
            const startDateTime: Date = new Date();
            // 将参数转为字符串
            const params: string = args.map(a => JSON.stringify(a)).join();
            const result = method!.apply(this, args);

            // 记录方法执行后时间
            const endDateTime: Date = new Date();

            // 方法执行耗时（毫秒）
            const time: number = endDateTime.getTime() - startDateTime.getTime();
            console.log(`Call method: ${className}.${propertyKey} consuming time ${time} ms.`);

            // 将结果转为字符串
            const resultString: string = JSON.stringify(result);

            // console.log(`Call method: ${className}.${propertyKey}(${params}) => ${resultString}`);

            return result;
        };
    };
}

