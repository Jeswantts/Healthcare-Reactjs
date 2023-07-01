using Appointments.Context;
using Appointments.DTO;
using Appointments.Interface;
using Models;

namespace Appointments.Service
{
    public class AppointService : IAppointDTO
    {
        private readonly IAppointment repo;
        private readonly AppointmentContext context;
        public AppointService(IAppointment _repo, AppointmentContext context)
        {
            repo = _repo;
            this.context = context;
        }

        public async Task<Doctor_Appoint_DTO> DocDiagnosis(Doctor_Appoint_DTO docappoint, int id)
        {
            var appointment = await repo.GetById(id);
            appointment.Patient_Status = docappoint.Patient_Status;
            appointment.Diagnosis = docappoint.Diagnosis;
            appointment.Treatment = docappoint.Treatment;
            await context.SaveChangesAsync();
            var doctorappointDto = new Doctor_Appoint_DTO
            {
                Patient_Status = appointment.Patient_Status,
                Diagnosis = appointment.Diagnosis,
                Treatment = appointment.Treatment,
            };
            return doctorappointDto;
        }

        public async Task<Patient_Appoint_DTO> SetAppoint(Patient_Appoint_DTO appoint)
        {
            var appointment = new Appoinment
            {
                Patient_ID = appoint.Patient_Id,
                Doctor_ID = appoint.Doctor_Id,
                Reason_of_visit = appoint.Reason_of_visit,
            };

            context.Appoinment.Add(appointment);
            await context.SaveChangesAsync();
            return appoint;
        }

        public async Task<Status_DTO> Status(Status_DTO status, int id)
        {
            var appointment = await repo.GetById(id);
            if (status.Status != null)
                appointment.Status = status.Status;

            await context.SaveChangesAsync();
            var updatedStatus_DTO = new Status_DTO
            {
                Status = appointment.Status,
            };
            return updatedStatus_DTO;
        }
    }
}
