using Microsoft.AspNetCore.Mvc;
using Vite.AspNetCore;
using ViteNET.React.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddEndpointsApiExplorer();

// Add the Vite services.
builder.Services.AddViteServices(options =>
{
    options.Server.AutoRun = true;
    options.Server.Https = true;
    options.Server.UseReactRefresh = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();
app.UseMiddleware<CustomMiddleware>();

app.MapGet("/api/one", () =>
{
    //return new OkResult();
    return "HI";
});


app.MapGet("/api/context", (HttpContext httpContext) =>
{
    // Accessing Request and Response
    var requestPath = httpContext.Request.Path;
    var requestMethod = httpContext.Request.Method;

    return $"Request Path: {requestPath}, Request Method: {requestMethod}";
});

if (app.Environment.IsDevelopment())
{
    app.UseWebSockets();
    // Use Vite Dev Server as middleware.
    app.UseViteDevelopmentServer(true);
}

app.Run();
