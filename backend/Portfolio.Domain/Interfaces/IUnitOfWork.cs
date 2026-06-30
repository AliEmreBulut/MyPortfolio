using System;
using System.Threading.Tasks;

namespace Portfolio.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    Task<int> SaveChangesAsync();
}
