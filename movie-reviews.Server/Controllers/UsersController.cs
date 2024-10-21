using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Roles = "Administrator")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _usersRepository;
        private readonly IMapper _mapper;

        public UsersController(IMapper mapper, IUserRepository usersRepository)
        { 
             _mapper = mapper;
            _usersRepository = usersRepository;
        }

        [HttpGet("GetAllUsers")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AppUser>))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetAllUsers(string searchTerm = null)
        {
            var users = await _usersRepository.GettAllUsersRepository(searchTerm);

            return Ok(users);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDto user, string id)
        {
            var userToUpdate = _mapper.Map<AppUser>(user);

            userToUpdate.Id = id;

            await _usersRepository.UpdateUserRepository(userToUpdate);

            return NoContent();
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
