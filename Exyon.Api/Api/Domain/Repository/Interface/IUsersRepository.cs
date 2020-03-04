using Api.Domain.Models.Users;
using Api.Domain.ViewsModel.Input;
using System.Linq;

namespace Api.Domain.Repository.Interface
{
    public interface IUsersRepository : IRepository<Usuarios, decimal>
    {
        IQueryable<Usuarios> Connect(UsersInput input);
        IQueryable<Usuarios> Get(UsersInput input);
        long Create(UsersInput input);
        long Update(UsersInput input);
        bool Remove(long? idUsuario);

    }
}
