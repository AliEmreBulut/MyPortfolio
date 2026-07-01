using System;
using System.Threading.Tasks;

namespace Portfolio.Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    //cancellation token eğer kullanıcı işlemini yarda keserse veritabanı işlemini iptal etmemizi sağlıyor.
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
