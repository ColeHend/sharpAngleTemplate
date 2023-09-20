using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using sharpAngleTemplate.data;
using sharpAngleTemplate.models.DTO;
using sharpAngleTemplate.models.entities;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserMapper userMapper;
        private readonly SharpAngleContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserRepository(UserMapper userMapper, SharpAngleContext dbContext, IHttpContextAccessor httpContextAccessor) 
        {
            this.httpContextAccessor = httpContextAccessor;
            this.userMapper = userMapper;
            this.dbContext = dbContext;
        }

        public int GetUserId() => int.Parse(httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier));

        public async Task<string[]> GetRoles(string username)
        {
            var user = await this.GetUser(username);
            return user.roles;
        }

        public async Task<string[]> GetRoles(int id)
        {
            var user = await this.GetUser(id);
            return user.roles;
        }

        public async Task<User?> GetUser(string username)
        {
            var userDb = dbContext.Users;
            var usernameDomain = await userDb.FirstOrDefaultAsync(u=>u.Username==username);
            if (usernameDomain != null)
            {
                return null;
            }

            return usernameDomain;
        }

        public async Task<User?> GetUser(int id)
        {
            var userDb = dbContext.Users;
            var usernameDomain = await userDb.FirstOrDefaultAsync(u=>u.Id==id);
            if (usernameDomain != null)
            {
                return null;
            }

            return usernameDomain;
        }

        public void CreatePasswordHash(string password, out byte[] passHash, out byte[] passSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passSalt = hmac.Key;
                passHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        public bool VerifyPasswordHash(string password, byte[] passHash, byte[] passSalt)
        {
            var ComputeHash = new HMACSHA512(passSalt).ComputeHash(Encoding.UTF8.GetBytes(password));
            return ComputeHash.SequenceEqual(passHash);
        }

    }
}