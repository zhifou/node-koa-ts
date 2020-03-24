// import { logClass } from './class-decorator';
// import { logMethod } from './method-decorator';
// import { logProperty } from './property-decorator';
// import { logParameter } from './parameter-decorator';

const logClass = function (target: any) {
    console.log('I am class decorator');
};
const logMethod = function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    console.log('I am method decorator');
};
const logParameter = function (target: any, methodName: string, paramIndex: number) {
    console.log('I am parameter decorator');
};
const logProperty = function (target: any, propertyName: string) {
    console.log('I am property decorator');
};

// 装饰器工厂，根据传入的参数调用相应的装饰器
export function log(...args: any[]) {

    switch (args.length) {
        case 3: // 可能是方法装饰器或参数装饰器
            // 如果第三个参数是数字，那么它是索引，所以这是参数装饰器
            if (typeof args[2] === 'number') {
                return logParameter.apply(this, args);
            }
            return logMethod.apply(this, args);
        case 2: // 属性装饰器
            return logProperty.apply(this, args);
        case 1: // 类装饰器
            return logClass.apply(this, args);
        default: // 参数数目不合法
            throw new Error('Not a valid decorator');
    }
}

@log
export class Employee {
    @log
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    @log
    greet(@log message: string): string {
        return `${this.name} says: ${message}`;
    }
}
