/**
 * @file 缺省值属性装饰器声明
 * @author zhaoyadong
 */

export function defaultValue(target: any, propertyKey: string) {
    target[propertyKey] = 'zhifou';
}


// export function defaultValue(value: any) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         target[propertyKey] = value;
//     };
// }

