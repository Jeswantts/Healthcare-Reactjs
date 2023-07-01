using Models;

namespace Doctors.Interface
{
    public interface IDoctor
    {
        public Task<ICollection<Doctor>> GetAll();
        public Task<Doctor> GetById(int id);
        public Task<Doctor> Post(Doctor doctor);
        public Task<Doctor> Put(Doctor doctor, int id);
        public Task<Doctor> DeleteById(int id);
    }
}
