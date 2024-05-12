using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using movie_reviews.Server.Data;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;

namespace movie_reviews.Server.Repository
{
    public class MovieRepository : IMovieRepository
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly ApplicationDbContext _context;

        public MovieRepository(ApplicationDbContext context, IReviewRepository reviewRepository)
        {
            _context = context;
            _reviewRepository = reviewRepository;
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

        public async Task<ICollection<Movie>> GetMovieRepositry(string searchTerm = null)
        {
            var query = await _context.Movies.ToListAsync();

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(x => x.Title.Contains(searchTerm)).ToList();
            }

            return query;
        }

        public async Task<Movie> DeleteMovieRepository(int id)
        { 
            var reviewsToDelete = await _context.Reviews.Where(x => x.MovieId == id).ToListAsync();

            _context.Reviews.RemoveRange(reviewsToDelete);

            var movie = await _context.Movies.FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return null;
            }

            _context.Movies.Remove(movie);

            await _context.SaveChangesAsync();

            return movie;
        }

        public async Task<Movie> UpdateMovieRepository(Movie updateMovie)
        {
            _context.Movies.Update(updateMovie);

            await _context.SaveChangesAsync();

            return updateMovie;
        }
    }
}
