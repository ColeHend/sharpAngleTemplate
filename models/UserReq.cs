using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace sharpAngleTemplate.models
{
    public class UserRegisterReq
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string MoreData { get; set; }
    }
    public class UserLoginReq
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    public class UserGetReq
    {
        public int? Id { get; set; }
        public string? Username { get; set; }
    }
    public class UserUpdateReq
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string MoreData { get; set; }
    }
    public class DeleteUserReq
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }

    }
}