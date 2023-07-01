namespace Doctors.Interface
{
    public interface IDoctorDTO<T>
    {
        public Task<ICollection<T>> Get();
    }
}
