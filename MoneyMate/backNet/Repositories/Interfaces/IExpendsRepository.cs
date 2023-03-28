using backNet.Models;
using Microsoft.AspNetCore.Mvc;

namespace backNet.Repositories.Interfaces
{
    public interface IExpendsRepository
    {
         Task<List<Expends>> GetExpends();
         Task PostExpend(Expends expend);

         Task DeleteExpend();
    }
}
