using System.ComponentModel.DataAnnotations;

namespace Appointments.DTO
{
    public class Patient_Appoint_DTO
    {
        [Required]
        public int Patient_Id { get; set; }
        [Required]
        public int Doctor_Id { get; set; }
        public string? Reason_of_visit { get; set; }
    }
}
