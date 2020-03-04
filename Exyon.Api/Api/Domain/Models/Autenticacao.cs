using Api.Domain.Models.Users;
using Api.Domain.Repository;
using Api.Domain.ViewsModel.Input;
using System.Linq;

namespace Api.Domain.Models
{
    public class Autenticacao : Repository<Usuarios, decimal>, IAutenticacao
    {
        public Autenticacao(BancoDadosContext context) : base(context)
        {
        }

        public Usuarios Register(UsersInput usuario)
        {
            var retorno = DbSet.Where(x => x.IdUsuario.Equals(usuario.IdUsuario == 0 ? x.IdUsuario : usuario.IdUsuario) &&
                                        x.Email.Equals(usuario.Email ?? x.Email)).AsQueryable();

            return retorno.FirstOrDefault();
        }

        public Usuarios Login(UsersInput usuario)
        {
            var retorno = DbSet.Where(x => x.Senha.Equals(usuario.Senha) &&
                                           x.Email.Equals(usuario.Email)).AsQueryable();

            return retorno.FirstOrDefault();
        }
         
    } 
}