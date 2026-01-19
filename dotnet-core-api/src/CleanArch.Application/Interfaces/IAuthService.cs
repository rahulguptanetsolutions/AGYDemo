using CleanArch.Application.Dto;
using System.Threading.Tasks;

namespace CleanArch.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    }
}
