﻿using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using movie_reviews.Server.Data;
using movie_reviews.Server.Interfaces;

namespace movie_reviews.Server.Repository
{
    public class UsersRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UsersRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<IdentityUser>> GettAllUsersRepository()
        {
            var users = await _context.Users.ToListAsync();

            if(users == null)
            {
                return null;
            }

            return users;
        }

        public async Task<IdentityUser> DeleteUserRepository(string userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(h => h.Id == userId);

            if(user == null)
            {
                return null;
            }

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return user;
        }
    }
}
