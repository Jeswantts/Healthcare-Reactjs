using Microsoft.EntityFrameworkCore;
using Models;

namespace Patients.Context
{
    public class PatientContext:DbContext
    {
        public PatientContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Patient> patients { get; set; }
    }
}
