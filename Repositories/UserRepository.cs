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

        public int GetUserId() => int.Parse(httpContextAccessor.HttpContext!.User.FindFirstValue(ClaimTypes.NameIdentifier));

        public async Task<string[]?> GetRoles(string username)
        {
            var user = this.GetUser(username);
            return user?.userType;
        }

        public async Task<string[]> GetRoles(int id)
        {
            var user = await this.GetUser(id);
            return user.userType;
        }
        public List<User> GetAllUsers()
        {
            var users = dbContext.Users.ToList();
            return users;
        }
        public User? GetUser(string username)
        {
            var send = dbContext.Users.Where(u=>u.Username==username).ToList();
            if (send.Count() > 0)
            {
                return send[0];
            } else
            {
                return null;
            }
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