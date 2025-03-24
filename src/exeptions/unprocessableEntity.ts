import { HttpExecption } from "./root";

export class UnprocessableEntity extends HttpExecption {
    constructor(error: any, message:string, errorCode:number) {
        super(message, errorCode, 422, error)
    }
}