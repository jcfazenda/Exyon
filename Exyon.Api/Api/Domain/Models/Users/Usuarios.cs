namespace Api.Domain.Models.Users
{
    public class Usuarios
    {
        public Usuarios()
        {
        }

        public Usuarios(long idUsuario, long? idUsuarioAdministrador, long? idTipo, string nome, string sobreNome, string cpf, string telefone, string email, string senha, string avatar, string canvas, bool? ativo)
        {
            IdUsuario               = idUsuario;
            IdUsuarioAdministrador  = idUsuarioAdministrador;
            IdTipo                  = idTipo;
            Nome                    = nome;
            SobreNome               = sobreNome;
            Cpf                     = cpf;
            Telefone                = telefone;
            Email                   = email;
            Senha                   = senha;
            Avatar                  = avatar;
            Canvas                  = canvas;
            Ativo                   = ativo;
        }

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

    }
}