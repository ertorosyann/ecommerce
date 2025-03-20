import { ErrorCodes, HttpExecption } from "./root";

export class InternalExeption extends HttpExecption {
    constructor(message: string,errors : any, errorCode: number){
        super(message, errorCode, 500, errors);
    }
}