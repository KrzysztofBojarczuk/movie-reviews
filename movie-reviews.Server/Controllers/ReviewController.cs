using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetAllReviews()
        {
            var review = await _reviewRepository.GetAllReviewsRepository();

            var reviewGet = _mapper.Map<List<Review>>(review);

            return Ok(reviewGet);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> CreateReview([FromBody] ReviewCreateDto review)
        {
            var reviewCreate = _mapper.Map<Review>(review);

            //reviewCreate.AppUserId = userId;

            await _reviewRepository.CreateReviewRepository(reviewCreate);

            var reviewGet = _mapper.Map<ReviewGetDto>(reviewCreate);

            return CreatedAtAction(nameof(GetReviewById), new { id = reviewCreate.Id }, reviewGet);
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetReviewById(int id)
        {
            var review = await _reviewRepository.GetReviewByIdRepository(id);

            if(review == null)
            {
                return NotFound();
            }

            var reviewGet = _mapper.Map<ReviewGetDto>(review);

            return Ok(reviewGet);
        }

        [HttpPut("Put/{id}/{userId}")]
        public async Task<IActionResult> UpdateReview([FromBody] ReviewCreateDto review, int id, string userId)
        {
            var toUpdateReview = _mapper.Map<Review>(review);

            toUpdateReview.Id = id;

            toUpdateReview.AppUserId = userId;

            await _reviewRepository.UpdateReviewRepository(toUpdateReview);

            return NoContent();
        }

        [HttpGet("Get/CountReviewsByUserId/{userId}")]
        public async Task<IActionResult> GetNumberReviewsByUserId(string userId)
        {
            var reviewsCount = await _reviewRepository.GetNumberReviewsByUserIdRepository(userId);

            if (reviewsCount == null)
            {
                return NotFound(); 
            }

            return Ok(reviewsCount);
        }

        [HttpDelete("Delete/{id}")]
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
