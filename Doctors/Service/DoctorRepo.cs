using Doctors.Context;
using Doctors.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Doctors.Service
{
    public class DoctorRepo : IDoctor
    {
        private readonly DoctorContext context;
        public DoctorRepo(DoctorContext _context)
        {
            context = _context;
        }
        public async Task<Doctor> DeleteById(int id)
        {
            var doctor = await context.Doctor.FindAsync(id);

            if (doctor != null)
            {
                context.Doctor.Remove(doctor);
                await context.SaveChangesAsync();
            }

            return doctor;
        }

        public async Task<ICollection<Doctor>> GetAll()
        {
            var doctor = await context.Doctor.ToListAsync();
            if (doctor != null)
            {
                return doctor;
            }
            return null;
        }

        public async Task<Doctor> GetById(int id)
        {
            var doctor = await context.Doctor.FindAsync(id);
            return doctor;
        }

        public async Task<Doctor> Post(Doctor doctor)
        {
            context.Doctor.Add(doctor);
            await context.SaveChangesAsync();
            return doctor;
        }

        public async Task<Doctor> Put(Doctor doctor, int id)
        {
            context.Doctor.Update(doctor);
            await context.SaveChangesAsync();
            return doctor;
        }
    }
}
