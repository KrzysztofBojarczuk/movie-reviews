using movie_reviews.Server.models;
using System.Diagnostics.Metrics;

namespace movie_reviews.Server.Interfaces
{
    public interface IReviewRepository
    {
        Task<ICollection<Review>> GetAllReviewsRepository();
        Task<Review> CreateReviewRepository(Review review);
        Task<Review> UpdateReviewRepository(Review updateReview);
        Task<Review> DeleteReviewRepository(int id);
        Task<Review> GetReviewByIdRepository(int id);
    }
}
