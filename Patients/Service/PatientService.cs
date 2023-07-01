using Microsoft.EntityFrameworkCore;
using Models;
using Patients.DTO;
using Patients.Interface;

namespace Patients.Service
{
    public class PatientService : IPatientDTO<Patient_Profile_DTO>
    {
        private readonly IPatient repo;
        public PatientService(IPatient _repo)
        {
            repo = _repo;
        }
        public async Task<Patient_Profile_DTO> Get(Patient_Profile_DTO item)
        {
            var patients = await repo.GetAll();
            Patient_Profile_DTO dto = new Patient_Profile_DTO();

            var patient = patients.FirstOrDefault(p =>
            p.Patient_Name == item.Patient_Name &&
            p.Age == item.Age &&
            p.Gender == item.Gender &&
            p.BloodGroup == item.BloodGroup &&
            p.Patient_Address == item.Patient_Address &&
            p.Patient_Phone == item.Patient_Phone);

            if (patient != null)
            {
                dto.Patient_Name = patient.Patient_Name;
                dto.Age = patient.Age;
                dto.Gender = patient.Gender;
                dto.BloodGroup = patient.BloodGroup;
                dto.Patient_Address = patient.Patient_Address;
                dto.Patient_Phone = (int)patient.Patient_Phone;
            }
            return dto;
        }
    }
}
