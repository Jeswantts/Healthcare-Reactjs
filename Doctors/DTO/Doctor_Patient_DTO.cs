using System.ComponentModel.DataAnnotations.Schema;

namespace Doctors.DTO
{
    public class Doctor_Patient_DTO
    {
        public string? ImageName { get; set; }
        public string? Doctor_Name { get; set; }
        public int Age { get; set; }
        public string? Specialization { get; set; }
        public string? Doctor_Experience { get; set; }
        public long Doctor_Mobile { get; set; }
        public string? Constulting_Day { get; set; }
        public DateTime Constulting_Time { get; set; }
        public string? Review { get; set; }

    }
}
