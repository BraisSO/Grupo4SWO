using backNet.Models;
using Microsoft.EntityFrameworkCore;

namespace backNet.Config
{
    public class DBApiContext : DbContext
    {
        public DBApiContext(DbContextOptions<DBApiContext> options) : base(options)
        {

        }

        public DbSet<Expends> Expends { get; set; }



    }
}
