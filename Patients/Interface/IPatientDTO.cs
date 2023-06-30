namespace Patients.Interface
{
    public interface IPatientDTO<T>
    {
        public Task<T> Get(T item);
    }
}
