using backNet.Models;
using Microsoft.EntityFrameworkCore;

namespace backNet.Config
{
    public class DbClienteContext : DbContext

    {
        public DbClienteContext(DbContextOptions<DbClienteContext> options) : base(options) { }
            public DbSet<Cliente> cliente { get; set; }
    }
}
