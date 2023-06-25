using Microsoft.AspNetCore.SignalR;                                        // using this
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoodMateServer.Models;

namespace MoodMateServer.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MoodMate";
            _connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);

                var users = _connections.Values
                .Where(c => c.Room == userConnection.Room)
                .Select(c => c);

                var count = users.Count();
                foreach(var user in users )
                {
                    user.IsAvailable = true;
                    _connections[user.ConnectionId] = user;
                }

                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            var users = _connections.Values
                .Where(c => (c.IsAvailable == true) && (c.UserIs == userConnection.UserWant) && (c.UserWant == userConnection.UserIs))
                .Select(c => c);

            var count = users.Count();
            string room = "Default";
            if(count > 0)
            {
                UserConnection user = _connections.FirstOrDefault().Value;
                user.IsAvailable = false;
                userConnection.IsAvailable = false;
                userConnection.Room = user.Room;
                room = user.Room;
                _connections[user.ConnectionId] = user;
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined");
            }
            else
            {
                string randomString = GenerateRandomString(10);
                userConnection.Room = randomString;
                userConnection.IsAvailable = true;
                room = randomString;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, room);

            userConnection.ConnectionId = Context.ConnectionId;
            _connections[Context.ConnectionId] = userConnection;

            // sending details of connected users
            await SendUsersConnected(room);
            // sending details of room name incase of any disputes
            await SendRoomName(room);
        }

        public async Task CheckAvailable(UserConnection userConnection)
        {
            var users = _connections.Values
                .Where(c => (c.IsAvailable == true) && (c.UserIs == userConnection.UserWant) && (c.UserWant == userConnection.UserIs))
                .Select(c => c);
            if(users.Count() > 0)
            {
                UserConnection user = _connections.FirstOrDefault().Value;
                user.IsAvailable = false;
                userConnection.IsAvailable = false;
                userConnection.Room = user.Room;
                _connections[user.ConnectionId] = user;
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined");
                await Groups.AddToGroupAsync(Context.ConnectionId, user.Room);
                userConnection.ConnectionId = Context.ConnectionId;
                _connections[Context.ConnectionId] = userConnection;
                await SendUsersConnected(user.Room);
                await SendRoomName(user.Room);
            }
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

        public Task SendRoomName(string room)
        {
            return Clients.Group(room).SendAsync("RoomName", room);
        }

        public static string GenerateRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random random = new Random();

            string randomString = new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            return randomString;
        }

    }
}
