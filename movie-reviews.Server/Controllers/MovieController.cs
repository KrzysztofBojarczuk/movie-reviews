using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using movie_reviews.Server.Dtos;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;
using movie_reviews.Server.Repository;

namespace movie_reviews.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;

        public MovieController(IMovieRepository movieRepository, IMapper mapper)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
        }

        [HttpPost()]
        public async Task<IActionResult> CreateMovie([FromBody] MovieCreateDto movie)
        {
            var movieCreate = _mapper.Map<Movie>(movie);

            await _movieRepository.CreateMovieRepository(movieCreate);

            var movieGet = _mapper.Map<MovieGetDto>(movieCreate);

            return CreatedAtAction(nameof(GetMovieById), new { id = movieGet.Id}, movieGet);
        }

        [HttpGet()]
        public async Task<IActionResult> GetAllMovies()
        {
            var movies = await _movieRepository.GetMovieRepositry();

            var moviesGet = _mapper.Map<List<MovieGetDto>>(movies);

            return Ok(moviesGet);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var movie = await _movieRepository.GetMovieByIdRepository(id);

            if (movie == null)
            {
                return NotFound();
            }

            var movieGet = _mapper.Map<MovieGetDto>(movie);

            return Ok(movieGet);
        }
    }
}
