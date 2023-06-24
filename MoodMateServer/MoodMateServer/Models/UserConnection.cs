using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MoodMateServer.Models
{
    public class UserConnection
    {
        public string User { get; set; }
        public string? Room { get; set; }
        public bool? IsAvailable { get; set; }
        public string UserIs { get; set; }
        public string UserWant { get; set; }
        public string? ConnectionId { get; set; }
    }

}
