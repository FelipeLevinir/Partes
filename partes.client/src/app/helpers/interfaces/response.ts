import { ResponseError } from "./response-error";

 

export class Response {
    Result: ResponseResult | undefined; 
    Data: any;
    DataType: string | undefined;
    Error: ResponseError | undefined;
    Warning: ResponseError | undefined;
}


export enum ResponseResult {
    Error = 0,
    OK = 1
}