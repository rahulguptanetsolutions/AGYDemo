using CleanArch.Application.Dto;
using CleanArch.Application.Interfaces;
using CleanArch.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CleanArch.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepository;

        public AuthController(IAuthService authService, IUserRepository userRepository)
        {
            _authService = authService;
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
            var response = await _authService.LoginAsync(loginDto);
            if (response == null)
            {
                return Unauthorized("Invalid username or password");
            }
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(LoginDto loginDto)
        {
            // Simplified register for POC
            var user = new User
            {
                Username = loginDto.Username,
                PasswordHash = loginDto.Password, // Plain text for POC
                Role = "User"
            };
            
            await _userRepository.AddAsync(user);
            return Ok(user);
        }
    }
}
