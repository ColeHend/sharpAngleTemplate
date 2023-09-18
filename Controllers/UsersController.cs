using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using sharpAngleTemplate.data;
using sharpAngleTemplate.models;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsersController : Controller
    {
        private readonly SharpAngleContext dbContext;
        private IUserMapper UserMapper;
        public UsersController(SharpAngleContext dbContext, IUserMapper UserMapper)
        {
            this.dbContext = dbContext;
            this.UserMapper = UserMapper;
        }

        [HttpPost]
        public IActionResult Register([FromBody] UserRegisterReq user)
        {
            var userDb = dbContext.Users;
            var userDomain = userDb.FirstOrDefault(u=>u.Username==user.Username);
            if (userDomain != null)
            {
                return BadRequest("User already Exists");
            }
            // Encrypt Password Here And Change the password saved to be encrypted

            userDb.Add(new models.entities.User(){
                Username=user.Username,
                Password=user.Password,
                MoreData=user.MoreData
            });


            dbContext.SaveChanges();
            
            return Ok(UserMapper.MapUser(userDb.ToList().Find(u=>u.Username==user.Username)));
        }

        [HttpPost]
        public IActionResult Login([FromBody] UserLoginReq user)
        {
            var userDb = dbContext.Users;
            // Check if user exists
            var userDomain = userDb.FirstOrDefault(u=>u.Username==user.Username);
            if (userDomain == null)
            {
                return BadRequest("User Doesn't Exists");
            }
            // Check if password is correct
            if (userDomain.Password == user.Password)
            {
                return Ok(UserMapper.MapUser(userDomain));
            }
            // Password is wrong
            return BadRequest("Incorrect Password");
        }

        [HttpPost]
        public IActionResult Get([FromBody] UserGetReq user)
        {
            var userDb = dbContext.Users;
            var usernameDomain = userDb.FirstOrDefault(u=>u.Username==user.Username);
            var userIdDomain = userDb.FirstOrDefault(u=>u.Id==user.Id);
            
            if (usernameDomain != null)
            {
                return Ok(UserMapper.MapUser(usernameDomain));
            } else if (userIdDomain != null)
            {
                return Ok(UserMapper.MapUser(userIdDomain));
            }

            return NotFound();
        }

        [HttpPut]
        public IActionResult Update([FromBody] UserUpdateReq user)
        {
            var userDb = dbContext.Users;
            var userDomain = userDb.FirstOrDefault(u=>u.Id==user.Id);
            if (userDomain == null)
            {
                return NotFound();
            }

            if (user.Username != null)
            {
                userDomain.Username = user.Username;
            }
            // Need to ReEncrypt
            if (user.Password != null)
            {
                userDomain.Password = user.Password;
            }

            if (user.MoreData != null)
            {
                userDomain.MoreData = user.MoreData;
            }
            dbContext.SaveChanges();

            return Ok(UserMapper.MapUser(userDomain));
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] DeleteUserReq user)
        {
            var userDb = dbContext.Users;
            var userDomain = userDb.FirstOrDefault(u=>u.Id==user.Id);
            if (userDomain == null)
            {
                return NotFound();
            }
            // Check if able to Delete
            if (userDomain.Username == user.Username && userDomain.Password == user.Password)
            {
                userDb.Remove(userDomain);
                dbContext.SaveChanges();
                return Ok();
            }

            return StatusCode(401);

        }
    }
}