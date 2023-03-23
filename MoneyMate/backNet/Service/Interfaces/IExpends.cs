using backNet.Models;
using Microsoft.AspNetCore.Mvc;

namespace backNet.Service.Interfaces
{
    public interface IExpends
    {
        public Task<ActionResult> Get();
        public Task<ActionResult> Post(Expends expends);

    }
}
