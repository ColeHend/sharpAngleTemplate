using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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

            var roles = new List<string>(){"Guest","User","Admin"};
            
            var newUser = new models.entities.User(){
                Username=user.Username,
                PasswordHash=passHash,
                PasswordSalt=passSalt,
                roles=roles.ToArray(),
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
            var userDb = dbContext.Users;
            // Check if user exists
            var userEntity = await userDb.FirstOrDefaultAsync(u=>u.Username==user.Username);
            if (userEntity != null)
            {
                // Check if password is correct
                if (userRepository.VerifyPasswordHash(user.Password, userEntity.PasswordHash, userEntity.PasswordSalt))
                {
                    return Ok(TokenRepo.CreateJWTToken(userEntity));
                }
            }

            // Info is wrong
            return BadRequest("Incorrect Username or Password");
        }

        [HttpPost]
        [Valid]
        [Authorize(Roles = "Guest;User;Admin")]
        public async Task<IActionResult> Get([FromBody] UserGetReq user)
        {
            var userDb = dbContext.Users;
            var usernameDomain = await userDb.FirstOrDefaultAsync(u=>u.Username==user.Username);
            var userIdDomain = await userDb.FirstOrDefaultAsync(u=>u.Id==user.Id);
            
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
        [Valid]
        [Authorize(Roles = "Guest;User;Admin")]
        public async Task<IActionResult> Update([FromBody] UserUpdateReq user)
        {
            var userDb = dbContext.Users;
            var userEntity = await userDb.FirstOrDefaultAsync(u=>u.Id==user.Id);
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
            var userEntity = await userDb.FirstOrDefaultAsync(u=>u.Id==user.Id);
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