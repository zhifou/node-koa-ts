/**
 * @file home
 * @author packjs
 */

import Koa from "koa";
import { classDecorator } from "../decorators/class.decorator";
import { defaultValue } from "../decorators/default.decorator";
import { performance } from "../decorators/performance";
import logger from "../utils/log";
import { Employee } from "../decorators/factory.decorator";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const verify = promisify(jwt.verify); // 解密

@classDecorator
class Home {
    constructor() {
        // 需要将this对象，bind进来，否则在方法中找不到this对象，或者方法实现使用箭头函数，this也指向当前类
        this.index = this.index.bind(this);
    }

    @defaultValue
    name: string = "";

    /**
     * 首页
     * @param ctx
     * @param next
     */
    @performance()
    public async index(ctx: Koa.Context, next: Function) {
        const token = ctx.header.authorization;

        const e: Employee = new Employee("zhangsan");
        e.greet("hello world");

        this.name = "zzz";
        for (let i = 0; i < 10000000; i++) {
            // wait a moment.
            this.name = String(i);
        }
        ctx.success({
            this: this,
            name: this.name,
        });

        await next();
    }
}

export default new Home();
