using Microsoft.EntityFrameworkCore;
using movie_reviews.Server.Data;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;

namespace movie_reviews.Server.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext _context;

        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Review> CreateReviewRepository(Review review)
        {
            await _context.Reviews.AddAsync(review);
            
            await _context.SaveChangesAsync();
            
            return review;
        }

        public async Task<ICollection<Review>> GetAllRepositoryAsync()
        {
            var query = await _context.Reviews.ToListAsync();

            return query;
        }
    }
}
