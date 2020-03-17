namespace Api.Domain.ViewsModel.Input
{
    public class UsersInput
    {
        public long IdUsuario { get; set; }
        public long? IdUsuarioAdministrador { get; set; }
        public long? IdTipo { get; set; }

        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public string Cpf { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Avatar { get; set; }
        public string Canvas { get; set; }
        public bool? Ativo { get; set; }
        public long? IdEmpresa { get; set; }
        public long? IdCentroCusto { get; set; }
    }
    
}
