using Doctors.Context;
using Doctors.DTO;
using Doctors.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Doctors.Service
{
    public class DoctorService : IDoctorDTO<Doctor_Patient_DTO>
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
                ImageName = d.ImageName,
                Doctor_Name = d.Doctor_Name,
                Doctor_Mobile = d.Doctor_Mobile,
                Specialization = d.Specialization,
                Doctor_Experience = d.Doctor_Experience,
                Constulting_Day = d.Constulting_Day,
                Constulting_Time = d.Constulting_Time,
                Review = d.Review
            }).ToList();

            return doctorPatientDTOs;
        }
    }
}
