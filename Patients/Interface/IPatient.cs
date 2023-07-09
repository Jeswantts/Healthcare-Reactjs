using Models;
using Patients.DTO;

namespace Patients.Interface
{
    public interface IPatient
    {
        public Task<ICollection<Patient>> GetAll();
        public Task<Patient> GetById(int id);
        public Task<Patient> Post(PatientwithPassword patientwithPassword);
        public Task<Patient> Put(Patient patient, int id);
        public Task<Patient> DeleteById(int id);
        public bool VerifyPassword(string password, string hashedPassword);
    }
}
