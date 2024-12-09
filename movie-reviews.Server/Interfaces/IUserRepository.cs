using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using movie_reviews.Server.Dtos;
using movie_reviews.Server.models;

namespace movie_reviews.Server.Interfaces
{
    public interface IUserRepository
    {
        Task<ICollection<AppUser>> GettAllUsersRepository();
        Task<ICollection<AppUser>>  GettAllUsersAdminRepository(string? searchTerm);
        Task<AppUser> UpdateUserRepository(AppUser updateUser);
        Task<AppUser> DeleteUserRepository(string id);
        Task<ICollection<Review>> GetUserWithReviewsRepository(string userId);
        Task<AppUser> GetUserByIdRepository(string userId);
        Task<int> GetNumberUsersRepository();
        Task<ICollection<string>> GetUserEmailsRepository(List<string> userId);
        Task<IdentityResult> RegisterUserRepository(RegisterUserDto registerUserDto);
    }
}
