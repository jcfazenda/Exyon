using Api.Domain.Models.Users;
using Api.Domain.ViewsModel.Input;

namespace Api.Domain.Models
{
    public interface IAutenticacao
    {
        Usuarios Register(UsersInput usuario);
        Usuarios Login(UsersInput usuario);
    }
}
