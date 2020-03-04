
using Api.Domain.Mapping;
using Api.Domain.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace Api
{
    public partial class BancoDadosContext : DbContext
    {
        public BancoDadosContext()
        {

        }

        public BancoDadosContext(DbContextOptions options) : base(options)
        {
        }
         
        public DbSet<Usuarios> Users { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /* usuarios */
            modelBuilder.ApplyConfiguration(new UsuariosMap());

            base.OnModelCreating(modelBuilder);
        }

    }
} 