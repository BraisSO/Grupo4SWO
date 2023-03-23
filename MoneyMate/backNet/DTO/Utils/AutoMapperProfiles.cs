using AutoMapper;
using backNet.Models;

namespace backNet.DTO.Utils
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() {

        CreateMap<ExpendsDTO,Expends>();
        CreateMap<Expends,ExpendsDTO>();
        }
    }
    
    
}
