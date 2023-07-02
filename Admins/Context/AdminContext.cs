using Microsoft.EntityFrameworkCore;
using Models;

namespace Admins.Context
{
    public class AdminContext:DbContext
    {
        public DbSet<Aadmin>Aadmin { get; set; }
        public AdminContext(DbContextOptions options) : base(options)
        {

        }
    }
}
