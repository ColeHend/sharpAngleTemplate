using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using sharpAngleTemplate.models.entities;

namespace sharpAngleTemplate.data
{
    public class SharpAngleContext: DbContext
    {
        public SharpAngleContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Pokemon> Pokemon { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
    }
}