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
        [Authorize]
        [HttpPost("Post")]
        public async Task<IActionResult> CreateReview([FromBody] ReviewCreateDto review)
        {
            var reviewCreate = _mapper.Map<Review>(review);

            await _reviewRepository.CreateReviewRepository(reviewCreate);

            var shopMapped = _mapper.Map<ReviewGetDto>(reviewCreate);

            return Ok();
        }
    }
}
