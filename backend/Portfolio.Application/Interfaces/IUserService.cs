using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Interfaces;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User?> GetUserByIdAsync(Guid id);
    Task<User> CreateUserAsync(User user);
    Task UpdateUserAsync(User user);
    Task DeleteUserAsync(Guid id);
}
