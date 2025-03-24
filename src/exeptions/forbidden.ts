import { HttpExecption } from "./root";

export class ForbiddenExeption extends HttpExecption {
    constructor(message: string, errorCode: number, error?: any) {
        super(message, errorCode, 403, error);
    }
}