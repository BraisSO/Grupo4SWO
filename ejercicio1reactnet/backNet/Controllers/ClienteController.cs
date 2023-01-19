using backNet.Config;
using backNet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backNet.Controllers
{
    [Route("/cliente")]
    public class ClienteController : Controller
    {
        private readonly DbClienteContext Context;
        public ClienteController(DbClienteContext context)
        {
            this.Context = context;
        }

        [HttpGet("lista-clientes")]
        public async Task<ActionResult<List<Cliente>>> List()
        {
            return await Context.cliente.ToListAsync();
        }

        [HttpPost("guardar")]
        public async Task<ActionResult> NuevoCliente([FromBody] Cliente cliente)
        {
            this.Context.Add(cliente);
            await Context.SaveChangesAsync();
            return Ok(cliente);
        }
    }
}
