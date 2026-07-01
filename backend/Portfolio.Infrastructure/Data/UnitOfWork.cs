using Portfolio.Domain.Interfaces;
using Portfolio.Infrastructure.Data.Contexts;

namespace Portfolio.Infrastructure.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        // Repository'lerin işaretlediği (Add, Update, Delete) tüm işlemleri veritabanına yansıtır.
        //appdbcontext içindeki otomatik create update zamanları burada devreye girecek.
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
    {
        //bittikten sonra temzileme işlemi
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}