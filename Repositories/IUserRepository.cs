using Microsoft.AspNetCore.Identity;
using sharpAngleTemplate.models.DTO;
using sharpAngleTemplate.models.entities;

namespace sharpAngleTemplate.Repositories
{
    public interface IUserRepository
    {
        public int GetUserId();
        User? GetUser(string username);
        Task<User?> GetUser(int id);
        List<User> GetAllUsers();
        Task<string[]> GetRoles(string username);
        Task<string[]> GetRoles(int id);
        void CreatePasswordHash(string password, out byte[] passHash, out byte[] passSalt);

        bool VerifyPasswordHash(string password, byte[] passHash, byte[] passSalt);
    }
}