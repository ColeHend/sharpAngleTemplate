using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace sharpAngleTemplate.models
{
    public class UserRegisterReq
    {
        [Required]
        [MinLength(3,ErrorMessage = "Username not long enough!")]
        public string Username { get; set; }

        [Required]
        [MinLength(8,ErrorMessage = "Password not long enough!")]
        public string Password { get; set; }
        public string MoreData { get; set; }
    }
    public class UserLoginReq
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
    public class UserGetReq
    {
        public int Id { get; set; }
        public string Username { get; set; }
    }
    public class UserUpdateReq
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(3,ErrorMessage = "Username not long enough!")]
        public string Username { get; set; }

        [Required]
        [MinLength(8,ErrorMessage = "Password not long enough!")]
        public string Password { get; set; }
        public string MoreData { get; set; }
    }
    public class DeleteUserReq
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }

    }
}