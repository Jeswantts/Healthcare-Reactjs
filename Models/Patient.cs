using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Patient
    {
        [Key]
        public int Patient_ID { get; set; }
        [Required]
        public string? Patient_Name { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        [RegularExpression("^(male|female|other)$")]
        public string? Gender { get; set; }
        [Required]
        public string? BloodGroup { get; set; }
        [Required]
        public string? Patient_Address { get; set; }
        [Required]
        [RegularExpression(@"^\d{10}$")]
        public long Patient_Phone { get; set; }
        [Required]
        [EmailAddress]
        public string? Patient_Email { get; set; }
        [Required]
        public string? Patient_UserName { get; set; }
        [Required]
        public string? Patient_HashedPassword { get; set; }

    }


}

