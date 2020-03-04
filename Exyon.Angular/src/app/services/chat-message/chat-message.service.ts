import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';  
import { ApiService } from '../api.service'; 
import { ChatInputViewModel } from './chat-message-interface';

@Injectable({
  providedIn: 'root'
})
export class ChatMessageService {

  constructor(private apiService: ApiService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    this.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    this.headers.append('Access-Control-Allow-Credentials', 'true');
  }

  headers: Headers;
  confirUrl = 'assents/config/json'; 
  
  SendChat(model: ChatInputViewModel): Observable<any> { 

    return this.apiService.post('ChatHub/SendChat', model).pipe(map((res: any) => {
      return res;
    }),
    catchError(error => {

        return error;
      })
    ); 
  }

  GetByCriteria(model: ChatInputViewModel): Observable<any> { 

    return this.apiService.post('ChatHub/GetByCriteria', model).pipe(map((res: any) => {
      return res;
    }),
    catchError(error => {

        return error;
      })
    ); 
  } 

}
