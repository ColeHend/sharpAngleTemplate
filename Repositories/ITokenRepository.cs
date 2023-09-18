using Microsoft.AspNetCore.Identity;

namespace sharpAngleTemplate.Repositories
{
    public interface ITokenRepository {
        string CreateJWTToken(IdentityUser user, List<string> roles);
    }
}