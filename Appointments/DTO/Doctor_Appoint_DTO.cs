using System.ComponentModel.DataAnnotations;

namespace Appointments.DTO
{
    public class Doctor_Appoint_DTO
    {
        [Required]
        public int Patient_Id { get; set; }
        public string? Patient_Status { get; set; } = "consulting";
        public string? Diagnosis { get; set; }
        public string? Treatment { get; set; }
    }
}
