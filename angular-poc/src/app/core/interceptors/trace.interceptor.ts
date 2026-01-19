import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { tap, finalize } from 'rxjs';

export const traceInterceptor: HttpInterceptorFn = (req, next) => {
    const logger = inject(LoggerService);
    const traceId = crypto.randomUUID ? crypto.randomUUID() : `trace-${Date.now()}`;
    const startTime = performance.now();

    const clonedRequest = req.clone({
        setHeaders: {
            'X-Correlation-ID': traceId
        }
    });

    logger.debug(`Outgoing Request [${req.method}] ${req.url}`, { traceId });

    return next(clonedRequest).pipe(
        tap({
            next: (event) => {
                if (event instanceof HttpResponse) {
                    const elapsed = performance.now() - startTime;
                    logger.info(`Received Response [${event.status}] ${req.url}`, {
                        traceId,
                        durationMs: elapsed.toFixed(2)
                    });
                }
            },
            error: (err) => {
                const elapsed = performance.now() - startTime;
                logger.error(`Request Failed [${err.status}] ${req.url}`, {
                    traceId,
                    durationMs: elapsed.toFixed(2),
                    error: err.message
                });
            }
        })
    );
};
