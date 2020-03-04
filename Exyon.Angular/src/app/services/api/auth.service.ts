import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators'; 

import { UsuarioInput } from '../models/user-interface';
import { ApiService } from '../api.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { 
  }
 
  confirUrl = 'assents/config/json'; 
 
  Send(model: any): Observable<any> {  

    return this.apiService.post(model.rota, model).pipe(map((res: any) => { 
      return res;
    }),
    catchError(error => { 
        return error;
      })
    ); 
  } 

  UpdateAsync(model: UsuarioInput): Observable<any> { 

    return this.apiService.post('User/UpdateAsync', model).pipe(map((res: any) => {
      return res;
    }),
    catchError(error => {

        return error;
      })
    ); 
  } 

  /*  */ 
  setUser(user: UsuarioInput): void {

    const user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
    localStorage.setItem('idUsuario', user.idUsuario.toString());

  } 

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken(): any {
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(): UsuarioInput {
    const user_string = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)) {
      const user: UsuarioInput = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  } 
  RemoveUsuario(model: any): Observable<any> { 

    return this.apiService.post('User/Remove', model).pipe(map((res: any) => { 
      return res;
    }),
    catchError(error => { 
        return error;
      })
    ); 
  }

  logoutUser(): any {
    const accessToken = localStorage.getItem('accessToken');
    const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return null;
  }


}
