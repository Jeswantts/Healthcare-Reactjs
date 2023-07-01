using Appointments.DTO;
using Models;

namespace Appointments.Interface
{
    public interface IAppointDTO
    {
        public Task<Patient_Appoint_DTO> SetAppoint(Patient_Appoint_DTO appoint);
        public Task<Status_DTO> Status(Status_DTO status,int id);
        public Task<Doctor_Appoint_DTO> DocDiagnosis(Doctor_Appoint_DTO docappoint,int id);

    }
}
