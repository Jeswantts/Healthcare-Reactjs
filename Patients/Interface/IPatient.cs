using Models;

namespace Patients.Interface
{
    public interface IPatient
    {
        public Task<ICollection<Patient>> GetAll();
        public Task<Patient> GetById(int id);
        public Task<Patient> Post(Patient patient);
        public Task<Patient> Put(Patient patient, int id);
        public Task<Patient> DeleteById(int id);
    }
}
