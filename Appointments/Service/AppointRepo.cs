using Appointments.Context;
using Appointments.Interface;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Appointments.Service
{
    public class AppointRepo : IAppointment
    {
        private readonly AppointmentContext context;
        public AppointRepo(AppointmentContext _context)
        {
            context = _context;
        }
        public async Task<Appoinment> DeleteById(int id)
        {
            var appointment = await context.Appoinment.FindAsync(id);

            if (appointment != null)
            {
                context.Appoinment.Remove(appointment);
                await context.SaveChangesAsync();
            }

            return appointment;
        }

        public async Task<ICollection<Appoinment>> GetAll()
        {
            var appointment = await context.Appoinment.ToListAsync();
            if (appointment != null)
            {
                return appointment;
            }
            return null;
        }

        public async Task<Appoinment> GetById(int id)
        {
            var appointments = await context.Appoinment.FindAsync(id);
            return appointments;
        }

        public async Task<Appoinment> Post(Appoinment appoinment)
        {
            context.Appoinment.Add(appoinment);
            await context.SaveChangesAsync();
            return appoinment;
        }

        public async Task<Appoinment> Put(Appoinment appoinment, int id)
        {
            var existingPatient = await context.Appoinment.FindAsync(id);
            await context.SaveChangesAsync();
            return existingPatient;
        }
    }
}
