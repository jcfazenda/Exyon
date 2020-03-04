export interface UsuarioInput {
    id?:          number;
    idEmpresa?:   number;
    idPais?:      number;
    idCidade?:    number;
    idUsuario?: number;
    primeiroNome?:  string;
    segundoNome?: string;
    cpf?:         string;
    celular?:     string;
    email?:       string; 
    avatar?:      string;
    ramal?:       string;
    tipoAgente?:  string;
    canvas?:      string;
    descricao?:   string;
    token?:   string;
    senha?:  string;
    telefone?: string;
    contacts?:   ContactsOutputViewModel;
    ativo?: boolean;

    nome?:  string;
    sobrenome?: string;
    rota?:  string;

  }
  
  
  export interface UsuarioOutputViewModel {
  
    id?:          number;
    idEmpresa?:   number;
    idPais?:      number;
    idCidade?:    number;


    primeiroNome?:  string;
    segundoNome?: string;
    cpf?:         string;
    celular?:     string;
    email?:       string; 
    avatar?:      string;
    ramal?:       string;
    tipoAgente?:  string;
    canvas?:      string;
    descricao?:   string;
    token?:   string;

    contacts?:   ContactsOutputViewModel;

  }

  export interface ContactsOutputViewModel {
    id:       string;
    name:     string;
    lastName: string;
    avatar:   string;
    nickname: string;
    company:  string;
    jobTitle: string;
    email:    string;
    phone:    string;
    address:  string;
    birthday: string;
    notes:    string;
  }
  


