using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using sharpAngleTemplate.models.entities;

namespace sharpAngleTemplate.data
{
    public class SharpAngleContext: DbContext
    {
        public SharpAngleContext(DbContextOptions<SharpAngleContext> dbContextOptions): base(dbContextOptions)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Pokemon> Pokemon { get; set; }
        public DbSet<Trainer> Trainers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "0",
                    ConcurrencyStamp = "0",
                    Name="Guest",
                    NormalizedName="Guest".ToUpper() 
                },
                new IdentityRole
                {
                    Id = "1",
                    ConcurrencyStamp = "1",
                    Name="User",
                    NormalizedName="User".ToUpper() 
                },
                new IdentityRole
                {
                    Id = "2",
                    ConcurrencyStamp = "2",
                    Name="Admin",
                    NormalizedName="Admin".ToUpper() 
                }
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);

        }
    }
}