using Patients.DTO;
using Patients.Interface;

namespace Patients.Service
{
    public class PatientService : IPatientDTO<Patient_Profile_DTO>
    {
        private readonly IPatient _repo;
        public PatientService(IPatient repo)
        {
            _repo = repo;
        }
        public Task<Patient_Profile_DTO> Get(Patient_Profile_DTO item)
        {
            throw new NotImplementedException();
        }
    }
}
