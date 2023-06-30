using Microsoft.EntityFrameworkCore;
using Models;

namespace Doctors.Context
{
    public class DoctorContext : DbContext
    {
        public DoctorContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Doctor> doctor { get; set; }
    }
}
