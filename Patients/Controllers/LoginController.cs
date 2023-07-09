using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models;
using Patients.Context;
using Patients.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Patients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private const string PatientRole = "Patient";

        private readonly IConfiguration _configuration;
        private readonly PatientContext _context;

        public LoginController(IConfiguration configuration, PatientContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Patient")]
        public async Task<IActionResult> PostDoctor(Patient_login_DTO loginDTO)
        {
            if (loginDTO != null && !string.IsNullOrEmpty(loginDTO.Username) && !string.IsNullOrEmpty(loginDTO.Password))
            {
                var patient = await GetPatient(loginDTO.Username);
                if (patient != null && PasswordHasher.VerifyPassword(loginDTO.Password, patient.Patient_HashedPassword))
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Patient_ID", patient.Patient_ID.ToString()),
                        new Claim("Username", patient.Patient_UserName),
                        new Claim(ClaimTypes.Role, PatientRole)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    var response = new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        patientId = patient.Patient_ID
                    };

                    return Ok(response);
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<Patient> GetPatient(string username)
        {
            return await _context.Patient.FirstOrDefaultAsync(d => d.Patient_UserName == username);
        }
    }
}
