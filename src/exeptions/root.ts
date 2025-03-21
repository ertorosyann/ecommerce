// message, status code , error codes, error

export class HttpExecption extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCodes;

    constructor(message:string, errorCode: ErrorCodes, statusCode: number, error: any) {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = error
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    ALL_FIELDS_ARE_REQUIRED = 1004,
    INVALID_EMAIL_FORMAT = 1005,
    PASSWORD_MUST_BE_LAESTS_6_CHARACTER = 1006,
    USER_DOES_NOT_EXISTS = 1007,
    UNAUTHORIZED = 1008,
    PRODUCT_NOT_FOUND = 1009,
    ADDRES_NOT_FOUND = 1010,
    ADDRES_DOES_NOT_BELONG = 1011,
    INTERNAL_SERVER_ERROR = 5001,
    UNPROCESSABLE_ENTITY = 2001
}