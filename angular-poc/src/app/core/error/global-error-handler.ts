import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private logger: LoggerService) { }

    handleError(error: any): void {
        const url = window.location.href;
        const message = error.message ? error.message : error.toString();

        this.logger.error('Unhandled Application Exception', {
            url,
            errorMessage: message,
            stack: error.stack,
            type: 'ClientError'
        });
    }
}
