namespace Doctors.Interface
{
    public interface IDoctorDTO<T>
    {
        public Task<ICollection<T>> Get();
        public Task<T> UpdateDto(T item, int id);
    }
}
