using Microsoft.EntityFrameworkCore;
using InsuranceAPI.Models.Entities;

namespace InsuranceAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Quote> Quotes { get; set; } = null!;
    }
}