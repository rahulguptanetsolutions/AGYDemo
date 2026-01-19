using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Threading.Tasks;

namespace CleanArch.Api.Middleware
{
    public class CorrelationIdMiddleware
    {
        private readonly RequestDelegate _next;
        private const string CorrelationIdHeader = "X-Correlation-ID";

        public CorrelationIdMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.Request.Headers.TryGetValue(CorrelationIdHeader, out StringValues correlationId))
            {
                correlationId = Guid.NewGuid().ToString();
            }

            // Set on context for other middleware (like exception handler)
            context.Items[CorrelationIdHeader] = correlationId.ToString();
            
            // Set on response header
            context.Response.Headers.Append(CorrelationIdHeader, correlationId);

            // OpenTelemetry / Activity Context Enrichment
            var activity = System.Diagnostics.Activity.Current;
            if (activity != null)
            {
                activity.SetTag("correlation.id", correlationId.ToString());
            }

            await _next(context);
        }
    }
}
