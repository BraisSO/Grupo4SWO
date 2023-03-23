using AutoMapper;
using backNet.DTO;
using backNet.Models;
using backNet.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backNet.Controllers
{
    [Route("/api")]
    public class ExpendsController : Controller
    {

        private readonly IExpendsRepository _expendsRepository;
        private readonly IMapper _mapper;



        public ExpendsController(IExpendsRepository expendsRepository, IMapper mapper)
        {

            _expendsRepository = expendsRepository;
            _mapper = mapper;
         }

            [HttpPost("save")] //Endpoint-> https://localhost:7023/api/save
        public async Task<ActionResult>Create([FromBody] ExpendsDTO createdExpendsDTO){

                var expend = _mapper.Map<Expends>(createdExpendsDTO);

                expend.Type = createdExpendsDTO.Type;
                expend.Amount= createdExpendsDTO.Amount;
                expend.Date= createdExpendsDTO.Date;

                await _expendsRepository.PostExpend(expend);
                return Ok(expend);

            }

        [HttpGet("getExpends")] //Endpoint-> https://localhost:7023/api/getExpends
        public async Task<List<ExpendsDTO>> GetExpends()
        {
            var expends= await _expendsRepository.GetExpends();
            return _mapper.Map<List<ExpendsDTO>>(expends);
           
        }



    }
   
    
}
