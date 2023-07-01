using Microsoft.EntityFrameworkCore;
using Models;

namespace Doctors.Context
{
    public class DoctorContext : DbContext
    {
        public DbSet<Doctor> Doctor { get; set; }
        public DoctorContext(DbContextOptions options) : base(options)
        {

        }
        
    }
}
