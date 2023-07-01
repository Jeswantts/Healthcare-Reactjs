using Doctors.Context;
using Doctors.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<Doctor> Put(int id, [FromForm] Doctor updatedDoctor, string password)
        {
            var doctor = await context.Doctor.FindAsync(id);

            if (doctor == null)
            {
                return null;
            }

            if (updatedDoctor.ImageName != null)
            {
                if (!string.IsNullOrEmpty(doctor.ImageName))
                {
                    string oldImagePath = Path.Combine(@"C:\Users\pc\Desktop\img", doctor.ImageName);
                    if (File.Exists(oldImagePath))
                    {
                        File.Delete(oldImagePath);
                    }
                }
                string newImagePath = Path.Combine(@"C:\Users\pc\Desktop\img", updatedDoctor.ImageName);
                using (Stream stream = new FileStream(newImagePath, FileMode.Create))
                {
                    updatedDoctor.file.CopyTo(stream);
                }
                doctor.ImageName = updatedDoctor.ImageName;
            }

            string hashedPassword = PasswordHasher.HashPassword(password);
            doctor.HashedPassword = hashedPassword;
            doctor.Status = updatedDoctor.Status;
            doctor.LastLogin = updatedDoctor.LastLogin;

            await context.SaveChangesAsync();

            return doctor;
        }

        public async Task<Doctor> Post([FromForm] Doctor doctor, string password)
        {
            string path = Path.Combine(@"C:\Users\pc\Desktop\img", doctor.ImageName);
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                doctor.file.CopyTo(stream);
            }
            string hashedPassword = PasswordHasher.HashPassword(password);
            doctor.HashedPassword = hashedPassword;
            doctor.Status = "pending";
            doctor.LastLogin = default;

            context.Doctor.Add(doctor);
            await context.SaveChangesAsync();
            return doctor;
        }
        public bool VerifyPassword(string password, string hashedPassword)
        {
            return PasswordHasher.VerifyPassword(password, hashedPassword);
        }
    }
}
