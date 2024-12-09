using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using movie_reviews.Server.Dtos;
using movie_reviews.Server.Interfaces;
using movie_reviews.Server.models;
using movie_reviews.Server.Repository;

namespace movie_reviews.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize()]
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
        [Authorize(Roles = "Administrator, Reviewer")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AppUser>))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _usersRepository.GettAllUsersRepository();

            return Ok(users);
        }

        [HttpGet("GetAllUsersAdmin")]
        [Authorize(Roles = "Administrator")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<AppUser>))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetAllUsersAdmin(string searchTerm = null)
        {
            var users = await _usersRepository.GettAllUsersAdminRepository(searchTerm);

            return Ok(users);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDto user, string id)
        {
            var userToUpdate = _mapper.Map<AppUser>(user);

            userToUpdate.Id = id;

            await _usersRepository.UpdateUserRepository(userToUpdate);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
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
        [Authorize(Roles = "Administrator")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
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
        [Authorize(Roles = "Administrator")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
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
        [Authorize(Roles = "Administrator")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public async Task<IActionResult> GetUserEmails([FromQuery] List<string> userId)
        {
            var userEmails = await _usersRepository.GetUserEmailsRepository(userId);

            if(userEmails == null)
            {
                return NotFound();
            }

            return Ok(userEmails);
        }

        [HttpPost("Register")]
        [Authorize(Roles = "Administrator")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _usersRepository.RegisterUserRepository(registerUserDto);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }

            return Created("api/Users", registerUserDto);
        }
    }
}
