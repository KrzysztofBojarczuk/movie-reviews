using Microsoft.EntityFrameworkCore;
using movie_reviews.Server.Data;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;

namespace movie_reviews.Server.Repository
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDbContext _context;

        public MovieRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Movie> CreateMovieRepository(Movie movie)
        {
            await _context.Movies.AddAsync(movie);

            await _context.SaveChangesAsync();

            return movie;
        }

        public async Task<Movie> GetMovieByIdRepository(int id)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(x => x.Id == id);

            if(movie == null)
            {
                return null;
            }

            return movie;
        }

        public async Task<ICollection<Movie>> GetMovieRepositry()
        {
            var movies = await _context.Movies.ToListAsync();

            return movies;
        }
    }
}
