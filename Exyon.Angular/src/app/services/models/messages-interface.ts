export interface MessagesInputViewModel {
    id?: number;
    idPersona?: number; 
  }
  
  
  export interface MessagesOutputViewModel {
  
    id?:                number;
    idPersona?:         number; 

    Transcricao?:       string;
    Sensacao?:          string;
    Audio?:             string;
    TipoMensagem?:      string;  
    SolicitarDados?:    boolean;

  } 