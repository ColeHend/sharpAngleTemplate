using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using sharpAngleTemplate.CustomActionFilters;
using sharpAngleTemplate.data;
using sharpAngleTemplate.models;
using sharpAngleTemplate.Repositories;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsersController : Controller
    {
        private readonly SharpAngleContext dbContext;
        private readonly IUserMapper UserMapper;
        private readonly ITokenRepository TokenRepo;
        private readonly IUserRepository userRepository;


        public UsersController(SharpAngleContext dbContext, IUserMapper UserMapper, ITokenRepository tokenRepo, IUserRepository userRepository)
        {
            this.dbContext = dbContext;
            this.UserMapper = UserMapper;
            this.TokenRepo = tokenRepo;
            this.userRepository = userRepository;

        }

        [HttpPost]
        [Valid]
        public async Task<IActionResult> Register([FromBody] UserRegisterReq user)
        {
            var userDb = dbContext.Users;
            var userDomain = await userDb.FirstOrDefaultAsync(u=>u.Username==user.Username);
            if (userDomain != null)
            {
                return BadRequest("User already Exists");
            }

            userRepository.CreatePasswordHash(user.Password, out byte[] passHash, out byte[] passSalt);
            // ------- change to something better proper roles ----
            var roles = new List<string>(){"Guest"};
            // var roles = new List<string>(){"Guest","User","Admin"};
            // ----------------------------------------------------
            var newUser = new models.entities.User(){
                Username=user.Username,
                PasswordHash=passHash,
                PasswordSalt=passSalt,
                userType=roles.ToArray(),
                MoreData=user.MoreData
            };
            userDb.Add(newUser);


            await dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Valid]
        public async Task<IActionResult> Login([FromBody] UserLoginReq user)
        {
            // Check if user exists
            Console.WriteLine(" ");
            Console.WriteLine("Login Request: ",user.Username.ToString());
            Console.WriteLine(" ");
            var userEntity = await userRepository.GetUser(user.Username);
            if (userEntity != null)
            {
                // Check if password is correct
                if (userRepository.VerifyPasswordHash(user.Password, userEntity.PasswordHash, userEntity.PasswordSalt))
                {
                    var rollin = new List<string>();
                    string[] backup = {"Guest"};
                    string[] rolesEntity = userEntity.userType != null && userEntity.userType.Count() > 0 ? userEntity.userType : backup;
                    foreach (var role in rolesEntity) 
                    {
                        rollin.Add(string.IsNullOrEmpty(role) ? "Guest": role);
                    }

                    string token = TokenRepo.CreateJWTToken(userEntity, rollin);
                    var BuildTokenJson = (string token)=>{
                        if (string.IsNullOrEmpty(token) == false)
                        {
                            var part1 = "{\"data\": ";
                            var part2 = $" \"{token}\"";
                            var part3 = "}";
                            return part1 + part2 + part3;
                        }
                        return string.Empty;
                    };
                        return Ok(BuildTokenJson(token));
                        // return new ContentResult() { Content = token, StatusCode = 200 };
                }
            }

            // Info is wrong
            return BadRequest("Incorrect Username or Password");
        }

        [HttpPost]
        [Valid]
        // [Authorize(Roles = "Guest;User;Admin")]
        public async Task<IActionResult> Get([FromBody] UserGetReq user)
        {
            if (string.IsNullOrEmpty(user.Username))
            {
                return BadRequest("No username was found on the request!");
            }

            var send = await userRepository.GetUser(user.Username);
            if (send != null)
            {
                return Ok(UserMapper.MapUser(send));
            }
            return NotFound("No user was found");
        }

        [HttpPut]
        [Valid]
        [Authorize(Roles = "Guest;User;Admin")]
        public async Task<IActionResult> Update([FromBody] UserUpdateReq user)
        {
            var userId = userRepository.GetUserId();
            var userEntity = await userRepository.GetUser(userId);

            if (userEntity == null)
            {
                return NotFound();
            }

            if (user.Username != null)
            {
                userEntity.Username = user.Username;
            }
            // Need to ReEncrypt
            // if (user.Password != null)
            // {
            //     userDomain.Password = user.Password;
            // }

            if (user.MoreData != null)
            {
                userEntity.MoreData = user.MoreData;
            }
            dbContext.SaveChanges();

            return Ok(UserMapper.MapUser(userEntity));
        }

        [HttpDelete]
        [Valid]
        [Authorize(Roles = "User;Admin")]
        public async Task<IActionResult> Delete([FromBody] DeleteUserReq user)
        {
            var userDb = dbContext.Users;
            var userEntity = await userRepository.GetUser(user.Username);
            if (userEntity == null)
            {
                return NotFound();
            }
            userDb.Remove(userEntity);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}