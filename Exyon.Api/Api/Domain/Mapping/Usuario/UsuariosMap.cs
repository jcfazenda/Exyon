namespace Api.Domain.Mapping
{
    using Api.Domain.Models.Users;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public sealed class UsuariosMap : IEntityTypeConfiguration<Usuarios>
    {
        public void Configure(EntityTypeBuilder<Usuarios> constuctor)
        {
            constuctor.ToTable("Usuario"); 

            constuctor.Property(m => m.IdUsuario).HasColumnName("IdUsuario").IsRequired();
            constuctor.HasKey(o => o.IdUsuario);

            constuctor.Property(m => m.Nome).HasColumnName("Nome");
            constuctor.Property(m => m.SobreNome).HasColumnName("SobreNome");
            constuctor.Property(m => m.Cpf).HasColumnName("Cpf");
            constuctor.Property(m => m.Senha).HasColumnName("Senha");
            constuctor.Property(m => m.Email).HasColumnName("Email");
            constuctor.Property(m => m.Avatar).HasColumnName("Avatar");
            constuctor.Property(m => m.Canvas).HasColumnName("Canvas");
            constuctor.Property(m => m.Ativo).HasColumnName("Ativo");
            constuctor.Property(m => m.Telefone).HasColumnName("Telefone");
            constuctor.Property(m => m.IdTipo).HasColumnName("IdTipo");
            constuctor.Property(m => m.IdUsuarioAdministrador).HasColumnName("IdUsuarioAdministrador");
        }
    }
}

