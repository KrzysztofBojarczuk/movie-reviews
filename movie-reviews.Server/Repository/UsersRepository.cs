using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using movie_reviews.Server.Data;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;

namespace movie_reviews.Server.Repository
{
    public class UsersRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UsersRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<AppUser>> GettAllUsersRepository()
        {
            var users = await _context.Users.ToListAsync();

            if(users == null)
            {
                return null;
            }

            return (ICollection<AppUser>)users;
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
    }
}
