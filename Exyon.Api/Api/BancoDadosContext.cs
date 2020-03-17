
using Api.Domain.Mapping;
using Api.Domain.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace Api
{
    public partial class BancoDadosContext : DbContext
    {
        public BancoDadosContext(){}

        public BancoDadosContext(DbContextOptions options) : base(options)
        {
        }
         
        public DbSet<Usuarios> Users { get; set; } 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {           
            modelBuilder.ApplyConfiguration(new UsuariosMap()); /* usuarios */
            base.OnModelCreating(modelBuilder);
        }
    }
} 