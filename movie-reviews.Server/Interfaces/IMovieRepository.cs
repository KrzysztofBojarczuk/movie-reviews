using movie_reviews.Server.models;

namespace movie_reviews.Server.Interfaces
{
    public interface IMovieRepository
    {
        Task<ICollection<Movie>> GetMovieRepositry();
        Task<Movie> CreateMovieRepository(Movie Movie);
        Task<Movie> GetMovieByIdRepository(int id);
    }
}
