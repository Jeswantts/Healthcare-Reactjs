using Microsoft.AspNetCore.Mvc;
using Models;

namespace Doctors.Interface
{
    public interface IDoctor
    {
        public Task<ICollection<Doctor>> GetAll();
        public Task<Doctor> GetById(int id);
        public Task<Doctor> Put(int id, [FromForm] Doctor updatedDoctor, string password);
        public Task<Doctor> Post([FromForm] Doctor doctor, string password);
        public Task<Doctor> DeleteById(int id);
        public bool VerifyPassword(string password, string hashedPassword);
    }
}
