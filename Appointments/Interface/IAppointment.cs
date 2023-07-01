using Models;

namespace Appointments.Interface
{
    public interface IAppointment
    {
        public Task<ICollection<Appoinment>> GetAll();
        public Task<Appoinment> GetById(int id);
        public Task<Appoinment> Post(Appoinment appoinment);
        public Task<Appoinment> Put(Appoinment appoinment, int id);
        public Task<Appoinment> DeleteById(int id);
    }
}
