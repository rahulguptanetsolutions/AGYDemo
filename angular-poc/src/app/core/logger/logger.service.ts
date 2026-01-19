import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    private readonly minLevel = environment.production ? LogLevel.INFO : LogLevel.DEBUG;

    log(level: LogLevel, message: string, metadata: any = {}): void {
        if (level < this.minLevel) return;

        const logEntry = {
            timestamp: new Date().toISOString(),
            level: LogLevel[level],
            message,
            ...metadata,
            environment: environment.production ? 'prod' : 'dev'
        };

        // Standard structured log to console
        this.printToConsole(level, logEntry);

        // Simulated export to centralized logging (e.g., ELK, Datadog, Application Insights)
        if (environment.production || level >= LogLevel.WARN) {
            this.shipLog(logEntry);
        }
    }

    private printToConsole(level: LogLevel, entry: any): void {
        switch (level) {
            case LogLevel.DEBUG: console.debug('[DEBUG]', entry); break;
            case LogLevel.INFO: console.info('[INFO]', entry); break;
            case LogLevel.WARN: console.warn('[WARN]', entry); break;
            case LogLevel.ERROR: console.error('[ERROR]', entry); break;
        }
    }

    private shipLog(entry: any): void {
        // Mock API call to logging buffer
        // In a real app, this would use a background task or beacon API
        // console.log('Shipping log to aggregator...', entry);
    }

    // Convenience methods
    debug(msg: string, meta?: any) { this.log(LogLevel.DEBUG, msg, meta); }
    info(msg: string, meta?: any) { this.log(LogLevel.INFO, msg, meta); }
    warn(msg: string, meta?: any) { this.log(LogLevel.WARN, msg, meta); }
    error(msg: string, meta?: any) { this.log(LogLevel.ERROR, msg, meta); }
}
