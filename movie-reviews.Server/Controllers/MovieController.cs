using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using movie_reviews.Server.Dtos;
using movie_reviews.Server.Enum;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;
using movie_reviews.Server.Repository;

namespace movie_reviews.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Administrator, User")]
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
        public async Task<IActionResult> GetAllMovies(string searchTerm = null, DateTime? startDatepicker = null, DateTime? endDatepicker = null, [FromQuery] List<Category> enumCategory = null)
        {
            var movie = await _movieRepository.GetMovieRepositry(searchTerm, startDatepicker, endDatepicker, enumCategory);

            var movieGet = _mapper.Map<List<MovieGetDto>>(movie);

            return Ok(movieGet);
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, MovieCreateDto movie)
        {

            var toUpdateMovie = _mapper.Map<Movie>(movie);

            toUpdateMovie.Id = id;

            await _movieRepository.UpdateMovieRepository(toUpdateMovie);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var movieToDelete = await _movieRepository.DeleteMovieRepository(id);

            if (movieToDelete == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
