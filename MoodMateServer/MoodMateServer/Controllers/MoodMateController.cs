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
        public string Get()
        {
            int TotalConnections = 1;
            return "value";
        }

        private async Task<int> GetConnectedUsersCount()
        {
            var connection = new HubConnectionBuilder()
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
