using Doctors.Context;
using Doctors.DTO;
using Doctors.Interface;

namespace Doctors.Service
{
    public class DoctorService : IDoctorDTO<Doctor_Patient_DTO>
    {
        private readonly IDoctor repo;
        private readonly DoctorContext context;
        public DoctorService(IDoctor _repo, DoctorContext context)
        {
            repo = _repo;
            this.context = context;
        }
        public Task<ICollection<Doctor_Patient_DTO>> Get()
        {
            throw new NotImplementedException();
        }

        public Task<Doctor_Patient_DTO> UpdateDto(Doctor_Patient_DTO item, int id)
        {
            throw new NotImplementedException();
        }
    }
}
