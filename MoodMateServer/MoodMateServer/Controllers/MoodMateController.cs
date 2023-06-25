using Microsoft.AspNetCore.Mvc;
using MoodMateServer.Hubs;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.AspNetCore.Http.Connections;

namespace MoodMateServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoodMateController : ControllerBase
    {

        [HttpGet]
        public Task<int> Get()
        {
            Task<int> TotalConnections = GetConnectedUsersCount();
            return TotalConnections;
        }

        private async Task<int> GetConnectedUsersCount()
        {
            var connection = new HubConnectionBuilder()
                .WithUrl("https://moodmateserver20230625045615.azurewebsites.net/chat")
                .Build();

            await connection.StartAsync();

            try
            {
                return await connection.InvokeAsync<int>("SendAllCurrentUsers");
            }
            finally
            {
                await connection.DisposeAsync();
            }
        }


    }
}
