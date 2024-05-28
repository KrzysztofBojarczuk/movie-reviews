using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using movie_reviews.Server.Data;
using movie_reviews.Server.Enum;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;
using movie_reviews.Server.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace movie_reviews.Tests.Repository
{
    public class MovieRepositoryTests
    {
        private readonly IMovieRepository _movieRepository;

        private async Task<ApplicationDbContext> GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

            var databaseContext = new ApplicationDbContext(options);
            databaseContext.Database.EnsureCreated();
            if (await databaseContext.Movies.CountAsync() <= 0)
            {
                for (int i = 1; i < 10; i++)
                {
                    databaseContext.Movies.Add(
                        new Movie()
                        {
                            Title = "Tests"

                        });
                    await databaseContext.SaveChangesAsync();
                }
            }

            return databaseContext;
        }

        [Fact]
        public async void MovieRepository_GetMovie_ReturnsMovie()
        {
            var title = "Alien";
            var startDatepicker = new DateTime(1979, 1, 1);
            var endDatepicker = new DateTime(1979, 12, 31);
            var categories = new List<Category>
            {
                Category.Scfi,
                Category.Horror,
                Category.Action
            };

            var dbContext = await GetDatabaseContext();
            var movieRepository = new MovieRepository(dbContext);

            var result = await movieRepository.GetMovieRepositry(title, startDatepicker, endDatepicker, categories);

            result.Should().NotBeNull();
            result.Should().BeOfType<List<Movie>>();
        }
    }
}
