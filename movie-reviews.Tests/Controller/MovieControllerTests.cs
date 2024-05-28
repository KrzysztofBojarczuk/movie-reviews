using AutoMapper;
using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using movie_reviews.Server.Controllers;
using movie_reviews.Server.Dtos;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace movie_reviews.Tests.Controller
{
    public class MovieControllerTests
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;
        public MovieControllerTests()
        {
            _movieRepository = A.Fake<IMovieRepository>();
            _mapper = A.Fake<IMapper>();
        }

        [Fact]
        public async Task MovieController_GetAllMovies_ReturnOkAsync()
        {
            var movie = A.Fake<ICollection<MovieGetDto>>();

            var movieList = A.Fake<List<MovieGetDto>>();

            A.CallTo(() => _mapper.Map<List<MovieGetDto>>(movie)).Returns(movieList);

            var controller = new MovieController(_movieRepository, _mapper);

            var result = await controller.GetAllMovies();

            result.Should().NotBeNull();

            result.Should().BeOfType(typeof(OkObjectResult));
        }

        [Fact]
        public async Task MovieController_GetMovieById_ReturnOkAsync()
        {
            int Id = 1;
            var movieMap = A.Fake<Movie>();
            var movie = A.Fake<Movie>();
            var movieCreate = A.Fake<MovieCreateDto>();
            var movies = A.Fake<ICollection<MovieGetDto>>();
            var movieList = A.Fake<List<MovieGetDto>>();

            A.CallTo(() => _mapper.Map<Movie>(movieCreate)).Returns(movie);
            A.CallTo(() => _movieRepository.CreateMovieRepository(movie)).Returns(movie);

            var controller = new MovieController(_movieRepository, _mapper);

            var result = await controller.CreateMovie(movieCreate);

            result.Should().NotBeNull();
        }
    }
}
