using System.ComponentModel.DataAnnotations;

namespace Appointments.DTO
{
    public class Status_DTO
    {
        [Required]
        public int Appointment_ID { get; set; }

        [Required]
        public string Status { get; set; } = "waiting";
    }
}
