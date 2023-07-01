using Doctors.DTO;
using Doctors.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Doctors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorDTO<Doctor_Patient_DTO> service;
        private readonly IDoctor d;
        public DoctorController(IDoctorDTO<Doctor_Patient_DTO> _service, IDoctor d)
        {
            service = _service;
            this.d = d;
        }
        [HttpGet]
        public async Task<ICollection<Doctor>> GetAll()
        {
            return await d.GetAll();
        }
        [HttpGet("{id}")]
        public async Task<Doctor> GetById(int id)
        {
            return await d.GetById(id);
        }
        [HttpPost]
        public async Task<Doctor> Post([FromForm] DoctorWithPassword doctorWithPassword)
        {
            return await d.Post(doctorWithPassword.doctor, doctorWithPassword.password);
        }
        [HttpPut]
        public async Task<Doctor> Put(int id, [FromForm] DoctorWithPassword doctorWithPassword)
        {
            return await d.Put(id, doctorWithPassword.doctor, doctorWithPassword.password);
        }
        [HttpDelete("{id}")]
        public async Task<Doctor> DeleteById(int id)
        {
            return await d.DeleteById(id);
        }
        [HttpGet("DoctorView")]
        public async Task<ICollection<Doctor_Patient_DTO>> Get()
        {
            return await service.Get();

        }

    }
}
