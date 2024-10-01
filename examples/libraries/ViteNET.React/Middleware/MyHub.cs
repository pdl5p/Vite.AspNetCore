using Microsoft.AspNetCore.SignalR;

namespace ViteNET.React.Middleware;

public class MyHub(ILogger<MyHub> logger) : Hub
{
    public async Task SendMessage(string user, string message)
    {
        logger.LogInformation($"{user}: {message}");
        //await Clients.All.SendAsync("ReceiveMessage", user, message);
        await Clients.Caller.SendAsync("ReceiveMessage", user, message);

        for (int i = 0; i < 100; i++)
        {
            if(i % 7 == 0)
            {
                await Task.Delay(180);
            }
            await Task.Delay(10);
            await Clients.Caller.SendAsync("Update", user, $"UPD: {i}");
        }
        await Clients.Caller.SendAsync("ReceiveMessage", user, "DONE");
    }
}