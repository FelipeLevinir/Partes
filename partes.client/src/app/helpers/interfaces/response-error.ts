export class ResponseError {
    Message: string = '';
    ErrorList: string[] = [];

    constructor(prmMessage: string) {
        this.Message = prmMessage;
    }
}

