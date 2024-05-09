using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.Repository;

namespace movie_reviews.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _usersRepository;
        public UsersController(IUserRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers(string searchTerm = null)
        {
            var users = await _usersRepository.GettAllUsersRepository(searchTerm);

            return Ok(users);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var deleteUser = await _usersRepository.DeleteUserRepository(id);

            if(deleteUser == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("UserReview/{id}")]
        public async Task<IActionResult>  GetUserWithReviews(string id)
        {
            var userReview = await _usersRepository.GetUserWithReviewsRepository(id);

            if(userReview == null)
            {
                return NotFound();
            }

            return Ok(userReview);
        }

        [HttpGet("UserNumber")]
        public async Task<IActionResult> GetNumberUsers()
        {
            var userNumber = await _usersRepository.GetNumberUsersRepository();

            if (userNumber == null)
            {
                return NotFound();
            }

            return Ok(userNumber);
        }

        [HttpGet("UserEmails")]
        public async Task<IActionResult> GetUserEmails([FromQuery] List<string> userId)
        {
            var userEmails = await _usersRepository.GetUserEmailsRepository(userId);

            if(userEmails == null)
            {
                return NotFound();
            }

            return Ok(userEmails);
        }
    }
}
