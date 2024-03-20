using movie_reviews.Server.models;
using System.Diagnostics.Metrics;

namespace movie_reviews.Server.Interfaces
{
    public interface IReviewRepository
    {
        Task<ICollection<Review>> GetAllRepositoryAsync();
        Task<Review> CreateReviewRepository(Review review);
    }
}
