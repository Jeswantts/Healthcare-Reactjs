using Microsoft.EntityFrameworkCore;
using Models;

namespace Appointments.Context
{
    public class AppointmentContext:DbContext
    {
        public AppointmentContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Appoinment> Appoinment { get; set; }
    }
}
