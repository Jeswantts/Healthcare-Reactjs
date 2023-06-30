using Microsoft.EntityFrameworkCore;
using Models;
using Patients.Context;
using Patients.Interface;

namespace Patients.Service
{
    public class PatientRepo : IPatient
    {
        private readonly PatientContext context;
        public PatientRepo(PatientContext _context)
        {
            context = _context;
        }
        public Task<Patient> DeleteById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Patient>> GetAll()
        {
            var patient = await context.patients.ToListAsync();
            if (patient != null)
            {
                return patient;
            }
            return null;
        }

        public Task<Patient> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Patient> Post(Patient patient)
        {
            throw new NotImplementedException();
        }

        public Task<Patient> Put(Patient patient, int id)
        {
            throw new NotImplementedException();
        }
    }
}
