using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Patients.DTO;
using Patients.Interface;

namespace Patients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientDTO<Patient_Profile_DTO> service;
        private readonly IPatient p;
        public PatientController(IPatientDTO<Patient_Profile_DTO> _service, IPatient p)
        {
            service = _service;
            this.p = p;
        }
        [HttpGet("Patients_Profile")]
        public async Task<Patient_Profile_DTO> GetDTO(Patient_Profile_DTO item)
        {
            return await service.Get(item);
        }


        [HttpGet]
        public async Task<ICollection<Patient>> Get()
        {
            return await p.GetAll();
        }
        [HttpGet("{id}")]
        public async Task<Patient> GetById(int id)
        {
            return await p.GetById(id);
        }
        [HttpPost]
        public async Task<Patient> Add(Patient patient)
        {
            return await p.Post(patient);
        }
        [HttpPut]
        public async Task<Patient> Put(Patient patient, int id)
        {
            return await p.Put(patient, id);
        }
        [HttpDelete("{id}")]
        public async Task<Patient> DeleteById(int id)
        {
            return await p.DeleteById(id);
        }
    }
}
