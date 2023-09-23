using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using sharpAngleTemplate.data;
using sharpAngleTemplate.models.DTO;
using sharpAngleTemplate.models.entities;
using sharpAngleTemplate.tools;

namespace sharpAngleTemplate.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SharpAngleContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserRepository(SharpAngleContext dbContext, IHttpContextAccessor httpContextAccessor) 
        {
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }
        public string? GetUsername(){
            var username = httpContextAccessor.HttpContext!.User.Identity?.Name;
            return username != null ? username : null;
        }
        public async Task<int?> GetUserId(){
            int? userId = null;
            var user = httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = httpContextAccessor.HttpContext.User.Identity?.Name;
            if (user != null)
            {
                userId = int.Parse(user);
                Console.WriteLine($" \n UserID: {userId}\n ");
            } else if(username != null)
            {
                var userEntity = await GetUser(username);
                userId = userEntity != null ? userEntity.Id : null;
            }
            return userId;
        }

        public async Task<string[]?> GetRoles(string username)
        {
            var user = await this.GetUser(username);
            return user?.userType;
        }

        public async Task<string[]?> GetRoles(int id)
        {
            var user = await this.GetUserId(id);
            return user?.userType;
        }
        public async Task<List<User>> GetAllUsers()
        {
            var users = await dbContext.Users.ToListAsync();
            return users;
        }
        public async Task<User?> GetUser(string username)
        {
            var send = await dbContext.Users.Where(u=>u.Username==username).ToListAsync();
            if (send.Count() > 0)
            {
                return send[0];
            } else
            {
                return null;
            }
        }

        public async Task<User?> GetUserId(int id)
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