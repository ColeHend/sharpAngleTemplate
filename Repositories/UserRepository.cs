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
        public async Task<bool> CheckPassword(UserDto user, IdentityRole Role)
        {
            var userDb = dbContext.Users;


            throw new NotImplementedException();
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
    }
}