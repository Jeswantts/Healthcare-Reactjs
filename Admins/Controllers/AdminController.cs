using Admins.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Admins.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private const string AdminRole = "Aadmin";

        private readonly IConfiguration _configuration;
        private readonly AdminContext _context;

        public AdminController(IConfiguration configuration, AdminContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Admin")]
        public async Task<IActionResult> Post(Aadmin _userData)
        {
            if (_userData != null && _userData.AdminName != null && _userData.AdminPassword != null)
            {
                var admin = await GetAdmin(_userData.AdminName, _userData.AdminPassword);

                if (admin != null)
                {

                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                         new Claim("Username", admin.AdminName),
                        new Claim("Password",admin.AdminPassword),
                        new Claim(ClaimTypes.Role, AdminRole)


                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(30),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
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

        private async Task<Aadmin?> GetAdmin(string username, string password)
        {
            return await _context.Aadmin.FirstOrDefaultAsync(u => u.AdminName == username && u.AdminPassword == password);
        }

    }
}

