using Appointments.DTO;
using Appointments.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Appointments.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointController : ControllerBase
    {
        private readonly IAppointDTO _service;
        public readonly IAppointment a;
        public AppointController(IAppointDTO service,IAppointment a)
        {
            _service = service;
            this.a = a;
        }

        [HttpPost("SetAppoint")]
        public async Task<Patient_Appoint_DTO> SetAppoint(Patient_Appoint_DTO appoint)
        {
            var appointment = await _service.SetAppoint(appoint);
            return appointment;
        }

        [HttpPut("DocDiagnosis")]
        public async Task<Doctor_Appoint_DTO> DocDiagnosis(Doctor_Appoint_DTO docappoint,int id)
        {
            return await _service.DocDiagnosis(docappoint,id);
        }

        [HttpPut("Status")]
        public async Task<Status_DTO> Status(Status_DTO status)
        {
            return await _service.Status(status);
        }

        [HttpGet("ByDoctor/{id}")]
        public async Task<Appoinment> GetById(int id)
        {
            var appointments = await a.GetById(id);

            if (appointments == null)
            {
                return null;
            }

            return appointments;
        }

        [HttpGet]
        public async Task<ICollection<Appoinment>> GetAll()
        {
            var appointments = await a.GetAll();
            return appointments;
        }

        [HttpDelete("{id}")]
        public async Task<Appoinment> DeleteById(int id)
        {
            var appointments = await a.DeleteById(id);
            return appointments;
        }
        [HttpGet("FilterbyDoctor/{id}")]
        public async Task<List<Appoinment>>Filter(int id)
        {
            var appointments = await _service.FilterByDoctor(id);
            return appointments;
        }
    }
}
