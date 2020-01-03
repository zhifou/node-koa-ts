/**
 * @file other
 * @author zhaoyadong
 */

import Koa from 'koa';
import {mock} from '../decorators/mock';
import {MOCK_TEST} from '../mocks/test.mock';
import logger from '../utils/log';

class Other {

    constructor() {
        // 需要将this对象，bind进来，否则在方法中找不到this对象，或者方法实现使用箭头函数，this也指向当前类
        this.getOther = this.getOther.bind(this);
    }

    @mock(MOCK_TEST)
    private _getBNS(): any {
        return {bns: 'aaaaaa'};
    }

    /**
     * 获取
     * @param ctx
     * @param next
     */
    public async getOther(ctx: Koa.Context, next: Function) {
        console.log(this);
        const result = this._getBNS();
        console.log(result);
        ctx.success(result);

        await next();
    }

    // /**
    //  * 获取
    //  * @param ctx
    //  * @param next
    //  */
    // public getOther = async(ctx: Koa.Context, next: Function) => {
    //     console.log(this);
    //     const result = this._getBNS();
    //     console.log(result);
    //     ctx.success(result);
    //
    //     await next();
    // }

}

export default new Other();
