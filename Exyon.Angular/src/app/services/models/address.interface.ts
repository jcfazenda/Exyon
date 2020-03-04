
export interface StateInputViewModel {

    id?:        number;

    initial?:   string;
    capital?:   string; 
    name?:      string; 
    region?:    string;  
  }
  
export interface StateOutputViewModel {

    id?:        number;
    
    initial?:   string;
    capital?:   string; 
    name?:      string; 
    region?:    string;  

    city?:    CityOutputViewModel; 
} 
   
export interface CityInputViewModel {

  id?:        number;
  idState?:   number;

  name?:      string; 
}

export interface CityOutputViewModel {

  id?:        number;
  idState?:   number;

  name?:      string;  
}

export interface CorreiosInputViewModel {

  id?:        number; 

  bairro?:      string;  
  endereco?:    string;  
  cidade?:      string;  
  domplemento?: string;  
  uf?:          string;  
  cep?:         string;  
 
}  

export interface FiltroAutoInputViewModel {

  id?:        number; 

  bairro?:      string;  
  endereco?:    string;  
  cidade?:      string;  
  estado?:      string;  
  domplemento?: string;  
  uf?:          string;  
  cep?:         string;

  dataInicio?:         Date;
  dataFinal?:         Date;
  ListAddress?: Array<Address>;
  
  IdadeDe?:         number;   
  IdadeAte?:        number;   

  Ano_modelo?:      number;   
  Ano_fabricacao?:  number;   
  Is_0km?:          boolean;  
  Placa?:           string;   

  Policy_situation_id?:   number; 
  Policy_situation_name?: string; 
  Corrector_under_id?:   number; 

  ListInsures?:                   Array<number>;
  ListBranches?:                  Array<number>; 


}

export interface Address {

  id?: number;

  bairro?: string;
  cep?: string;
  cidade?: string;
  complemento?: string;
  endereco?: string;
  
  uf?: string;
  unidadesPostagem?: boolean;

}




