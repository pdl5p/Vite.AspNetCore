namespace ViteNET.React.Middleware;

public class CustomMiddleware
{
    private readonly RequestDelegate _next;

    public CustomMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Some logic before calling the next middleware
        if (context.Request.Path == "/stop")
        {
            // Ending the pipeline
            context.Response.StatusCode = StatusCodes.Status403Forbidden; // For example
            await context.Response.WriteAsync("Pipeline stopped here.");
            return; // Do not call _next(context)
        }

        // Call the next middleware in the pipeline
        await _next(context);
    }
}