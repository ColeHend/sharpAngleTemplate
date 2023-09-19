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
        {}
        
        public DbSet<User> Users => Set<User>();
        public DbSet<Pokemon> Pokemon => Set<Pokemon>();
        public DbSet<Trainer> Trainers => Set<Trainer>();

    }
}