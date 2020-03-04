using Api.Domain.Models.Users;
using Api.Domain.Repository.Interface;
using Api.Domain.ViewsModel.Input;
using System.Linq;

namespace Api.Domain.Repository.Queryable
{
    public class UsersRepository : Repository<Usuarios, decimal>, IUsersRepository
    {
        private readonly BancoDadosContext _context;
        public UsersRepository(BancoDadosContext context) : base(context)
        {
            _context = context;
        }

        public IQueryable<Usuarios> Connect(UsersInput input)
        {
            var data = DbSet.Where(x => x.Email.Equals(input.Email)
                                     && x.Senha.Equals(input.Senha)).AsQueryable();

            return data;
        }
        public IQueryable<Usuarios> Get(UsersInput input)
        {
            var data = DbSet.Where(x => x.IdUsuario.Equals(input.IdUsuario)).AsQueryable();

            return data;
        }

        public long Create(UsersInput input)
        {
            Usuarios create = new Usuarios();

            create.Nome         = input.Nome;
            create.SobreNome    = input.SobreNome;
            create.Cpf          = input.Cpf;
            create.Email        = input.Email;
            create.Senha        = input.Senha;
            create.Avatar       = input.Avatar;
            create.Canvas       = input.Canvas;
            create.Ativo        = input.Ativo;
            create.Telefone    = input.Telefone;
            create.IdTipo = input.IdTipo;
            create.IdUsuarioAdministrador = input.IdUsuarioAdministrador;

            _context.Add(create);
            _context.SaveChanges();

            return create.IdUsuario;
        }
        public long Update(UsersInput input)
        {
            Usuarios update = DbSet.Where(x => x.IdUsuario.Equals(input.IdUsuario)).AsQueryable().FirstOrDefault();

            update.Nome         = input.Nome;
            update.SobreNome    = input.SobreNome;
            update.Cpf          = input.Cpf;
            update.Email        = input.Email;
            update.Senha        = input.Senha;
            update.Avatar       = input.Avatar;
            update.Canvas       = input.Canvas;
            update.Ativo        = input.Ativo;
            update.Telefone     = input.Telefone;
            update.IdTipo       = input.IdTipo;
            update.IdUsuarioAdministrador = input.IdUsuarioAdministrador;

            _context.Update(update);
            _context.SaveChanges();

            return update.IdUsuario;
        }
        public bool Remove(long? idUsuario)
        {
            Usuarios remove = DbSet.Where(x => x.IdUsuario.Equals(idUsuario)).AsQueryable().FirstOrDefault();

            _context.Remove(remove);
            _context.SaveChanges();

            return true;
        }

    }

}
