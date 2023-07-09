using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Doctor
    {
        [Key]
        public int Doctor_ID { get; set; }
        [Required]
        public string? Doctor_Name { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        [RegularExpression("^(male|female|other)$")]
        public string? Gender { get; set; }
        [Required]
        public DateTime DOB { get; set; }
        [Required]
        public string? Specialization { get; set;}
        [Required]
        [EmailAddress]
        public string? Doctor_Email { get; set; }
        [Required]
        public string? Doctor_Address { get; set; }
        [Required]
        [RegularExpression(@"^\d{10}$")]
        public long Doctor_Mobile { get; set; }
        [Required]
        [RegularExpression(@"^\d{10}$")]
        public long Emergency_No { get; set; }
        [Required]
        public string? Doctor_Experience { get; set; }
        [Required]
        public string? Constulting_Day { get; set; }
        [Required]
        public DateTime Constulting_Time { get; set; }
        [Required]
        public string? Username { get; set; }
        public string? HashedPassword { get; set; }
        public string Status { get; set; } = "pending";
        [Required]
        public string? ImageName { get; set; }
        [Required]
        public string? Review { get; set; }
        public DateTime LastLogin { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
        public ICollection<Patient>? Patient { get; set; }
    }

}