using movie_reviews.Server.models;
using movie_reviews.Server.Repository;
using System.Diagnostics.Metrics;

namespace movie_reviews.Server.Interfaces
{
    public interface IReviewRepository
    {
        Task<ICollection<Review>> GetAllReviewsRepository(string? searchTerm, string? sortOrder);
        Task<ICollection<Review>> GetReviewsByMovieIdRepository(int id);
        Task<Review> CreateReviewRepository(Review review);
        Task<Review> UpdateReviewRepository(Review updateReview);
        Task<Review> DeleteReviewRepository(int id);
        Task<Review> GetReviewByIdRepository(int id);
        Task<int> GetNumberReviewsByUserIdRepository(string id);
        Task<int> GetNumberOfReviewsRepository();
        Task<int> GetNumberOfReviewsForMovieByIdRepository(int id);
    }
}
