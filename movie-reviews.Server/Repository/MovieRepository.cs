using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using movie_reviews.Server.Data;
using movie_reviews.Server.Enum;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;
using System.Diagnostics.Metrics;

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

        public async Task<ICollection<Movie>> GetMovieRepositry(string searchTerm, List<Category> enumCategory)
        {
            var query = await _context.Movies.ToListAsync();

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(x => x.Title.ToLower().Contains(searchTerm.ToLower())).ToList();
            }

            if (!enumCategory.IsNullOrEmpty())
            {
                query = query.Where(x => enumCategory.Contains(x.Category)).ToList();
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

            var userIds = reviewsToDelete.Select(r => r.AppUserId).ToList();

            var users = await _context.Users.Where(u => userIds.Contains(u.Id)).ToListAsync();

            foreach (var user in users)
            {
                var reviewsToDeleteByUser = reviewsToDelete.Where(r => r.AppUserId == user.Id).ToList();

                user.NumberOfReviews -= reviewsToDeleteByUser.Count;
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
