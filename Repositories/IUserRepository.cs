using Microsoft.AspNetCore.Identity;
using sharpAngleTemplate.models.DTO;
using sharpAngleTemplate.models.entities;

namespace sharpAngleTemplate.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUser(string username);
        Task<User> GetUser(int id);

        Task<User> GetRoles(string username);

        void CreatePasswordHash(string password, out byte[] passHash, out byte[] passSalt);

        bool VerifyPasswordHash(string password, byte[] passHash, byte[] passSalt);
    }
}