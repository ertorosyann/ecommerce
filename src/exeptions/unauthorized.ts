import {  HttpExecption } from "./root";

export class UnauthorizedExecption extends HttpExecption {
    constructor(message: string, errorCode: number, errors?: any){
        super(message, errorCode, 401, errors);
    }
}