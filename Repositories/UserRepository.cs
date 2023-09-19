using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
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

        public UserRepository(UserMapper userMapper, SharpAngleContext dbContext) 
        {
            this.userMapper = userMapper;
            this.dbContext = dbContext;
        }

        public async Task<User> GetRoles(string username)
        {
            var userDb = dbContext.Users;

            throw new NotImplementedException();
        }

        public async Task<User> GetUser(string username)
        {
            var userDb = dbContext.Users;

            throw new NotImplementedException();
        }

        public async Task<User> GetUser(int id)
        {
            var userDb = dbContext.Users;

            throw new NotImplementedException();
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