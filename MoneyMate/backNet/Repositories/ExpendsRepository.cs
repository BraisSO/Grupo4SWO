using backNet.Config;
using backNet.Models;
using backNet.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backNet.Repositories
{
    public class ExpendsRepository: IExpendsRepository
    {

        private readonly DBApiContext _context;

        public ExpendsRepository(DBApiContext context)
        {
            _context = context;
        }

        public async Task<List<Expends>> GetExpends()
        {
            return await _context.Expends.ToListAsync();
        }

        public async Task PostExpend(Expends expend)
        {
            _context.Expends.Add(expend);
            await  _context.SaveChangesAsync();
        }
    }
}
