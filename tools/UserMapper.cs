using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using sharpAngleTemplate.models.DTO;
using sharpAngleTemplate.models.entities;

namespace sharpAngleTemplate.tools
{
    public class UserMapper : IUserMapper
    {
        public UserDto MapUser(User user)
        {
            return new UserDto(){
                Id=user.Id,
                Username=user.Username,
                MoreData=user.MoreData
            };
        }
        public User MapUser(UserDto user)
        {
            return new User(){
                Id=user.Id,
                Username=user.Username,
                PasswordHash=user.PassHash,
                PasswordSalt=user.PassSalt,
                MoreData=user.MoreData
            };
        }
    }
    public interface IUserMapper
    {
        public UserDto MapUser(User user);
        public User MapUser(UserDto user);
    }
}