using Models;

namespace Doctors.DTO
{
    public class DoctorWithPassword
    {
        public Doctor doctor { get; set; }
        public string password { get; set; }
    }
}
