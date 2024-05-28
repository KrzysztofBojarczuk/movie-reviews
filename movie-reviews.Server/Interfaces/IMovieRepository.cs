using movie_reviews.Server.Enum;
using movie_reviews.Server.models;

namespace movie_reviews.Server.Interfaces
{
    public interface IMovieRepository
    {
        Task<ICollection<Movie>> GetMovieRepositry(string searchTerm, DateTime? startDatepicker, DateTime? endDatepicker, List<Category> enumCategory);
        Task<Movie> CreateMovieRepository(Movie Movie);
        Task<Movie> GetMovieByIdRepository(int id);
        Task<Movie> UpdateMovieRepository(Movie updateMovie);
        Task<Movie> DeleteMovieRepository(int id);
    }
}
