using Api.Domain.Models.Users;
using Api.Domain.ViewsModel.Output;
using AutoMapper;

namespace Api.Domain.Configuration.AutoMapper
{
    public class DomainToViewModelProfile : Profile
    {
        public DomainToViewModelProfile()
        {
  
            #region Usuarios

            CreateMap<Usuarios, UsersOutput>()
                .ForMember(f => f.IdUsuario,                t => t.MapFrom(m => m.IdUsuario))
                .ForMember(f => f.Nome,                     t => t.MapFrom(m => m.Nome))
                .ForMember(f => f.SobreNome,                t => t.MapFrom(m => m.SobreNome))
                .ForMember(f => f.Cpf,                      t => t.MapFrom(m => m.Cpf))
                .ForMember(f => f.Senha,                    t => t.MapFrom(m => m.Senha))
                .ForMember(f => f.Email,                    t => t.MapFrom(m => m.Email))
                .ForMember(f => f.Avatar,                   t => t.MapFrom(m => m.Avatar))
                .ForMember(f => f.Canvas,                   t => t.MapFrom(m => m.Canvas))
                .ForMember(f => f.Ativo,                    t => t.MapFrom(m => m.Ativo))
                .ForMember(f => f.Telefone,                 t => t.MapFrom(m => m.Telefone))
                .ForMember(f => f.IdUsuarioAdministrador,   t => t.MapFrom(m => m.IdUsuarioAdministrador))
                .ForMember(f => f.IdTipo,                   t => t.MapFrom(m => m.IdTipo))
                ;

            #endregion

        }
    }
} 