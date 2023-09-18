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

        Task<bool> CheckPassword(UserDto user, IdentityRole Role);
    }
}