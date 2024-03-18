using Microsoft.AspNetCore.Identity;

namespace movie_reviews.Server.Interfaces
{
    public interface IUserRepository
    {
        Task<ICollection<IdentityUser>> GettAllUsersRepository();
    }
}
