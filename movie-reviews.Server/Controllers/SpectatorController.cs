using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using movie_reviews.Server.Dtos;
using movie_reviews.Server.Enum;
using movie_reviews.Server.Interfaces;

namespace movie_reviews.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize()]
    public class SpectatorController : ControllerBase
    {

        private readonly IMovieRepository _movieRepository;
        private readonly IReviewRepository _reviewRepository;
        private readonly IMapper _mapper;

        public SpectatorController(IMovieRepository movieRepository, IReviewRepository reviewRepository, IMapper mapper)
        {
            _reviewRepository = reviewRepository;
            _movieRepository = movieRepository;
            _mapper = mapper;
        }

        [HttpGet("Movies")]
        public async Task<IActionResult> GetAllMovies(string searchTerm = null, DateTime? startDatepicker = null, DateTime? endDatepicker = null, [FromQuery] List<Category> enumCategory = null)
        {
            var movie = await _movieRepository.GetMovieRepositry(searchTerm, startDatepicker, endDatepicker, enumCategory);

            var movieGet = _mapper.Map<List<MovieGetDto>>(movie);

            return Ok(movieGet);
        }

        [HttpGet("GetAverageOfRatingForMovieById/{id}")]
        public async Task<IActionResult> GetAverageOfRatingForMovieById(int id)
        {
            var averageRating = await _reviewRepository.GetAverageOfRatingForMovieByIdRepository(id);

            if (averageRating == null)
            {
                return NotFound();
            }

            return Ok(averageRating);
        }

        [HttpGet("GetCosteOfReviewsForMovieById/{id}")]
        public async Task<IActionResult> GetCosteOfReviewsForMovieById(int id)
        {
            var reviewCost = await _reviewRepository.GetCosteOfReviewsForMovieByIdRepository(id);

            if (reviewCost == null)
            {
                return NotFound();
            }

            return Ok(reviewCost);
        }

        [HttpGet("GetReviewsByMovieId/{id}")]
        public async Task<IActionResult> GetReviewsByMovieId(int id)
        {
            var review = await _reviewRepository.GetReviewsByMovieIdRepository(id);

            var reviewGet = _mapper.Map<List<ReviewGetDto>>(review);

            return Ok(reviewGet);
        }

        [HttpGet("CountReviewsForMovieById/{id}")]
        public async Task<IActionResult> GetNumberReviewsForMovieById(int id)
        {
            var reviewsCount = await _reviewRepository.GetNumberOfReviewsForMovieByIdRepository(id);

            if (reviewsCount == null)
            {
                return NotFound();
            }

            return Ok(reviewsCount);
        }
    }
}
