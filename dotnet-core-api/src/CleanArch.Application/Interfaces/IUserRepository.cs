using CleanArch.Domain.Entities;
using System.Threading.Tasks;

namespace CleanArch.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByUsernameAsync(string username);
        Task<User> AddAsync(User user);
    }
}
