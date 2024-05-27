using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using movie_reviews.Server.Dtos;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;

namespace movie_reviews.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IMapper _mapper;

        public ReviewController(IMapper mapper, IReviewRepository reviewRepository)
        {
            _mapper = mapper;
            _reviewRepository = reviewRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllReviews(string searchTerm = null, string sortOrder = null)
        {
            var review = await _reviewRepository.GetAllReviewsRepository(searchTerm, sortOrder);

            var reviewGet = _mapper.Map<List<ReviewGetDto>>(review);

            return Ok(reviewGet);
        }

        [HttpGet("GetReviewsByMovieId/{id}")]
        public async Task<IActionResult> GetReviewsByMovieId(int id)
        {
            var review = await _reviewRepository.GetReviewsByMovieIdRepository(id);

            var reviewGet = _mapper.Map<List<ReviewGetDto>>(review);

            return Ok(reviewGet);
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

        [HttpGet("GetNumberOfReviews")]
        public async Task<IActionResult> GetNumberOfReviews()
        {
            var reviews = await _reviewRepository.GetNumberOfReviewsRepository();

            if(reviews == null)
            { 
                return NotFound(); 
            }

            return Ok(reviews);
        }


        [HttpPost()]
        public async Task<IActionResult> CreateReview([FromBody] ReviewCreateDto review)
        {
            var reviewCreate = _mapper.Map<Review>(review);

            //reviewCreate.AppUserId = userId;

            await _reviewRepository.CreateReviewRepository(reviewCreate);

            var reviewGet = _mapper.Map<ReviewGetDto>(reviewCreate);

            return CreatedAtAction(nameof(GetReviewById), new { id = reviewCreate.Id }, reviewGet);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviewById(int id)
        {
            var review = await _reviewRepository.GetReviewByIdRepository(id);

            if (review == null)
            {
                return NotFound();
            }

            var reviewGet = _mapper.Map<ReviewGetDto>(review);

            return Ok(reviewGet);
        }

        [HttpPut("{id}/{userId}")]
        public async Task<IActionResult> UpdateReview([FromBody] ReviewCreateDto review, int id, string userId)
        {
            var toUpdateReview = _mapper.Map<Review>(review);

            toUpdateReview.Id = id;

            toUpdateReview.AppUserId = userId;

            await _reviewRepository.UpdateReviewRepository(toUpdateReview);

            return NoContent();
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

        [HttpGet("CountReviewsByUserId/{userId}")]
        public async Task<IActionResult> GetNumberReviewsByUserId(string userId)
        {
            var reviewsCount = await _reviewRepository.GetNumberReviewsByUserIdRepository(userId);

            if (reviewsCount == null)
            {
                return NotFound(); 
            }

            return Ok(reviewsCount);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var deleteReview = await _reviewRepository.DeleteReviewRepository(id);

            if (deleteReview == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
