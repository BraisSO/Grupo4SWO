using backNet.Models;
using Microsoft.EntityFrameworkCore;

namespace backNet.Config
{
    public class DbGrupo4SwoContext : DbContext

    {
        public DbGrupo4SwoContext(DbContextOptions<DbGrupo4SwoContext> options) : base(options) { }
            public DbSet<Cliente> Clientes { get; set; }
    }
}
