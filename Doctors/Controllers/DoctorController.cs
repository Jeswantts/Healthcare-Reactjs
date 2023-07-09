using Doctors.DTO;
using Doctors.Interface;
using Doctors.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Doctors.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorDTO service;
        private readonly IDoctor d;
        public DoctorController(IDoctorDTO _service, IDoctor d)
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
            return await d.Post(doctorWithPassword);
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
        [HttpPut("ChangePass/{id}")]
        public async Task<ActionResult<Doctor_Password_DTO>> ChangePassword(int id, ChangePasswordModel model)
        {
            var doctorDto = await service.ChangePassword(id, model.OldPassword, model.NewPassword);

            if (doctorDto == null)
            {
                // Doctor not found or old password is incorrect
                return BadRequest("Invalid old password.");
            }

            return Ok(doctorDto);
        }
        [HttpPost("updateimage/{id}")]
        public async Task<IActionResult> UpdateImage(int id, [FromForm] UpdateImage_DTO updateImageDTO)
        {
            try
            {
                UpdateImage_DTO updatedImage = await service.UpdateImage(id,updateImageDTO);
                return Ok(updatedImage);
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occurred during image update
                return StatusCode(500, $"An error occurred during image update: {ex.Message}");
            }
        }
        [HttpPost("{id}/activation")]
        public async Task<IActionResult> ActivateDoctor(int id, [FromBody] DoctorActivation_DTO doctorActivationDTO)
        {
            try
            {
                DoctorActivation_DTO activatedDoctor = await service.Activation(id, doctorActivationDTO);
                return Ok(activatedDoctor);
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occurred during activation
                return StatusCode(500, $"An error occurred during doctor activation: {ex.Message}");
            }
        }

    }
}
