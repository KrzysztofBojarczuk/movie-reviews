using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using movie_reviews.Server.Data;
using movie_reviews.Server.Dtos;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace movie_reviews.Server.Repository
{
    public class UsersRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UsersRepository(ApplicationDbContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<ICollection<AppUser>> GettAllUsersRepository()
        {
           return await _userManager.Users.ToListAsync();
        }

        public async Task<ICollection<AppUser>> GettAllUsersAdminRepository(string searchTerm)
        {
            var query = await _userManager.Users.Include(x => x.Review).ToListAsync();

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(x => x.UserName.ToLower().Contains(searchTerm.ToLower()) ||
                                         x.Email.ToLower().Contains(searchTerm.ToLower())).ToList();
            }

            return query;
        }

        public async Task<AppUser> DeleteUserRepository(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            var reviewsToDelete = await _context.Reviews.Where(x => x.AppUserId == userId).ToListAsync();

            _context.Reviews.RemoveRange(reviewsToDelete);

            await _userManager.DeleteAsync(user);

            return user;
        }

        public async Task<AppUser> GetUserByIdRepository(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            return user;
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
            return await _userManager.Users.CountAsync();
        }
        public async Task<ICollection<string>> GetUserEmailsRepository(List<string> userIds)
        {
            var userEmails = await _userManager.Users
                                               .Where(u => userIds.Contains(u.Id))
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

        public async Task<IdentityResult> RegisterUserRepository(RegisterUserDto registerUserDto)
        {
            var user = new AppUser
            {
                UserName = registerUserDto.UserName,
                Email = registerUserDto.Email
            };

            var createUserResult = await _userManager.CreateAsync(user, registerUserDto.Password);
            if (!createUserResult.Succeeded)
            {
                return createUserResult;
            }

            var role = await _roleManager.FindByNameAsync("Reviewer");

            if (role == null)
            {
                var createRoleResult = await _roleManager.CreateAsync(new IdentityRole("Reviewer"));
                if (!createRoleResult.Succeeded)
                {
                    await _userManager.DeleteAsync(user); 
                    return createRoleResult;
                }
            }

            var addToRoleResult = await _userManager.AddToRoleAsync(user, "Reviewer");
            if (!addToRoleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user); 
                return addToRoleResult;
            }

            return IdentityResult.Success;
        }
    }
}
