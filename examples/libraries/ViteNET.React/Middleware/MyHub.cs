using Microsoft.AspNetCore.SignalR;

namespace ViteNET.React.Middleware;

public class MyHub(ILogger<MyHub> logger) : Hub
{
    public async Task SendMessage(string user, string message)
    {
        logger.LogInformation($"{user}: {message}");
        //await Clients.All.SendAsync("ReceiveMessage", user, message);
        await Clients.Caller.SendAsync("ReceiveMessage", user, message);

        for (int i = 0; i < 10; i++)
        {
            await Task.Delay(300);
            await Clients.Caller.SendAsync("Update", user, $"UPD: {i}");
        }
        await Clients.Caller.SendAsync("ReceiveMessage", user, "DONE");
    }
}