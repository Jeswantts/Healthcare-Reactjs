using System.ComponentModel.DataAnnotations.Schema;

namespace Doctors.DTO
{
    public class UpdateImage_DTO
    {
        public int Id { get; set; }
        public string ImageName { get; set; }
        [NotMapped]
        public IFormFile file { get; set; }
    }
}
