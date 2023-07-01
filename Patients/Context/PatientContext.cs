using Microsoft.EntityFrameworkCore;
using Models;

namespace Patients.Context
{
    public class PatientContext:DbContext
    {
        public DbSet<Patient> Patient { get; set; }
        public PatientContext(DbContextOptions options) : base(options)
        {

        }
        
    }
}
