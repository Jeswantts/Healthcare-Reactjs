using Doctors.DTO;
using Models;

namespace Doctors.Interface
{
    public interface IDoctorDTO
    {
        public Task<ICollection<Doctor_Patient_DTO>> Get();
        public Task<Doctor_Password_DTO> ChangePassword(int id, string oldPassword, string newPassword);
        public Task<UpdateImage_DTO> UpdateImage(int id,UpdateImage_DTO updateImageDTO);
        public Task<DoctorActivation_DTO> Activation(int id, DoctorActivation_DTO doctorActivation_DTO);
    }
}
