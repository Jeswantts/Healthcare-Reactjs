using Doctors.Context;
using Doctors.DTO;
using Doctors.Interface;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Doctors.Service
{
    public class DoctorService : IDoctorDTO
    {
        private readonly IDoctor repo;
        private readonly DoctorContext context;
        public DoctorService(IDoctor _repo, DoctorContext context)
        {
            repo = _repo;
            this.context = context;
        }
        public async Task<ICollection<Doctor_Patient_DTO>> Get()
        {
            var doctors = await repo.GetAll();
            var doctorPatientDTOs = doctors.Select(d => new Doctor_Patient_DTO
            {
                ID = d.Doctor_ID,
                ImageName = d.ImageName,
                Doctor_Name = d.Doctor_Name,
                Age = d.Age,
                Doctor_Mobile = d.Doctor_Mobile,
                Specialization = d.Specialization,
                Doctor_Experience = d.Doctor_Experience,
                Constulting_Day = d.Constulting_Day,
                Constulting_Time = d.Constulting_Time,
                Review = d.Review,
                Status = d.Status,
            }).ToList();

            return doctorPatientDTOs;
        }
        public async Task<Doctor_Password_DTO> ChangePassword(int id, string oldPassword, string newPassword)
        {
            Doctor doctor = await context.Doctor.FindAsync(id);


            bool isOldPasswordCorrect = PasswordHasher.VerifyPassword(oldPassword,doctor.HashedPassword);
            if (!isOldPasswordCorrect)
            {
                return null;
            }
            string newHashedPassword = PasswordHasher.HashPassword(newPassword);
            doctor.HashedPassword = newHashedPassword;
            await context.SaveChangesAsync();

            return new Doctor_Password_DTO
            {
                Id = doctor.Doctor_ID,
                Password = newPassword,
                HashedPassword = newHashedPassword
            };

        }
        public async Task<UpdateImage_DTO> UpdateImage(int id, UpdateImage_DTO updateImageDTO)
        {
            Doctor doctor = await context.Doctor.FindAsync(id);

            if (!string.IsNullOrEmpty(doctor.ImageName))
            {
                string oldImagePath = Path.Combine(@"C:\Users\jeswa\OneDrive\Desktop\Kanini\React\healthcare_frontend\public\Images", doctor.ImageName);
                if (File.Exists(oldImagePath))
                {
                    File.Delete(oldImagePath);
                }
            }

            string imagePath = Path.Combine(@"C:\Users\jeswa\OneDrive\Desktop\Kanini\React\healthcare_frontend\public\Images", updateImageDTO.ImageName);
            using (Stream stream = new FileStream(imagePath, FileMode.Create))
            {
                await updateImageDTO.file.CopyToAsync(stream);
            }

            doctor.ImageName = updateImageDTO.ImageName;
            await context.SaveChangesAsync();
            return updateImageDTO;
        }
        public async Task<DoctorActivation_DTO> Activation(int id,DoctorActivation_DTO doctorActivationDTO)
        {
            Doctor doctor = await context.Doctor.FindAsync(id);
            doctor.Status = doctorActivationDTO.status;
            await context.SaveChangesAsync();
            return doctorActivationDTO;
        }


    }
}
