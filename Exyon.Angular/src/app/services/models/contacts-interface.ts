 

export interface ContactsInputViewModel {
    id?: number;
    idUsuario?: number;
    Document?: number; 
    Email?: number; 
    Password?: number;  
  }
  
  export interface Captchainput {

    idCentroCusto?:   number;
    idUsuario?:   number;
    CountCaptcha?:    number;
    Email?:           string;
    Senha?:           string;
    SiteKey?:         string;
    Page?:            string; 
    Message?:         string; 
    Token?:           string; 
    IdEmpresa?:       number;
    Status?:          boolean;  
    idCentroCustoOnline?: number;
  } 