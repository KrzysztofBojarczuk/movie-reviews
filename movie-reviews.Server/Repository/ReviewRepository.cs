using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == review.AppUserId);

            user.NumberOfReviews++;

            await _context.SaveChangesAsync();
            
            return review;
        }

        public async Task<Review> DeleteReviewRepository(int id)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(x => x.Id == id);

            if(review == null)
            {
                return null;
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == review.AppUserId);

            user.NumberOfReviews--;

            _context.Reviews.Remove(review);

            await _context.SaveChangesAsync();

            return review;
        }

        public async Task<ICollection<Review>> GetAllReviewsRepository(string searchTerm, string sortOrder)
        {
            var query = _context.Reviews.AsQueryable();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(x => x.Title.ToLower().Contains(searchTerm.ToLower()));
            }

            query = sortOrder switch
            {
                "rating_desc" => query.OrderByDescending(x => x.Rating),
                "rating_asc" => query.OrderBy(x => x.Rating),
                _ => query.OrderByDescending(x => x.Id)
            };

            return await query.ToListAsync();
        }

        public async Task<decimal> GetCosteOfReviewsForMovieByIdRepository(int id)
        {
            var reviews = await _context.Reviews.Where(x => x.MovieId == id).ToListAsync();

            var costOfreviews = reviews.Select(x => x.CostOfReview).Sum();

            return costOfreviews;
        }

        public async Task<decimal> GetAverageOfRatingForMovieByIdRepository(int id)
        {
            var reviews = await _context.Reviews.Where(x => x.MovieId == id).ToListAsync();

            if (reviews.Count == 0)
            {
                return 0; 
            }

            var averageRating = reviews.Average(x => x.Rating);

            return (decimal)averageRating;
        }

        public async Task<int> GetNumberOfReviewsForMovieByIdRepository(int id)
        {
           var countNumberForReviews = await _context.Reviews.Where(x => x.MovieId == id).CountAsync();

            return countNumberForReviews;
        }

        public async Task<int> GetNumberOfReviewsRepository()
        {
            var reviews = await _context.Reviews.CountAsync();

            return reviews;
        }

        public async Task<int> GetNumberReviewsByUserIdRepository(string id)
        {
            var reviewsCount = await _context.Reviews.CountAsync(x => x.AppUserId == id);

            return reviewsCount;
        }

        public async Task<Review> GetReviewByIdRepository(int id)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(x => x.Id == id);

            if (review == null)
            {
                return null;
            }

            return review;
        }

        public async Task<ICollection<Review>> GetReviewsByMovieIdRepository(int id)
        {
            var reviews = await _context.Reviews.Where(x => x.MovieId  == id).ToListAsync();

            if (reviews == null)
            {
                return null;
            }

            return reviews;
        }

        public async Task<Review> UpdateReviewRepository(Review updateReview)
        {
            _context.Reviews.Update(updateReview);

            await _context.SaveChangesAsync();

            return updateReview;
        }
    }
}
