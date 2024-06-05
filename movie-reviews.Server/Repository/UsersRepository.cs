using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using movie_reviews.Server.Data;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace movie_reviews.Server.Repository
{
    public class UsersRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UsersRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<AppUser>> GettAllUsersRepository(string searchTerm)
        {
            var query = await _context.Users.Include(x => x.Review).ToListAsync();

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(x => x.UserName.ToLower().Contains(searchTerm.ToLower()) || x.Email.ToLower().Contains(searchTerm.ToLower())).ToList();
            }

            if (query == null)
            {
                return null;
            }

            return (ICollection<AppUser>)query;
        }

        public async Task<AppUser> DeleteUserRepository(string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if(user == null)
            {
                return null;
            }

            var reviewsToDelete = await _context.Reviews.Where(x => x.AppUserId == userId).ToListAsync();

            _context.Reviews.RemoveRange(reviewsToDelete);

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return (AppUser)user;
        }

        public async Task<AppUser> GetUserByIdRepository(string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if(user == null )
            {
                return null;
            }

            return (AppUser)user;
        }

        public async Task<ICollection<Review>> GetUserWithReviewsRepository(string userId)
        {
            var userReviews = await _context.Reviews.Where(x => x.AppUserId == userId).ToListAsync();

            if (userReviews == null)
            {
                return null;
            }

            return userReviews;
        }

        public async Task<int> GetNumberUsersRepository()
        {
            var userNumber = await _context.Users.CountAsync();

            return userNumber;
        }
        public async Task<ICollection<string>> GetUserEmailsRepository(List<string> userId)
        {
            var userEmails = await _context.Users
                                          .Where(u => userId.Contains(u.Id))
                                          .Select(u => u.Email)
                                          .ToListAsync();

            return userEmails;
        }

        public async Task<AppUser> UpdateUserRepository(AppUser updateUser)
        {
            _context.Users.Update(updateUser);

            await _context.SaveChangesAsync();

            return updateUser;
        }
    }
}
