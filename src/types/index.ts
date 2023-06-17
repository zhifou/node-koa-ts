/**
 * @file index.ts
 */
type TRespData = {
    [key: string]: any;
};
type TMessage = {
    [key: number]: string;
};

export type TStatus = {
    [key: string]: number;
};

export type TResponse = {
    status: number;
    data: TRespData;
    message: TMessage;
};

/**
 * 构造函数类型
 */
export interface IConstructable {
    new (...args: any[]): any;
}