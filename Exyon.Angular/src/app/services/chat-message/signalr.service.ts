import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { ChatMessage, ChatInputViewModel } from './chat-message-interface';
import { CONFIGURATION } from '../../../app/services/chat-message/chat-configuration'; 

const WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS = 2000;

@Injectable()
export class SignalRService {
 
  _messageSent: ChatInputViewModel = {
    id:             0,
    message:       '',
    idContactTo:    0,
    idContactFrom:  0,
    date:           new Date()
  };

  nick = '';
  message = '';
  
  messageReceived           = new Subject<ChatMessage>();
  newCpuValue               = new Subject<Number>();
  connectionEstablished     = new Subject<Boolean>();

  private hubConnection: HubConnection;

    constructor() {

        this.createConnection();
        this.startConnection();  
        this.registerOnServerEvents(); 
    }

    sendChatMessage(message: string): any { 
  
        console.log('Send Chat Message...');

        this._messageSent.message      = message.toString();
        this._messageSent.idContactTo   = 2
        this._messageSent.idContactFrom = 1; 
        this._messageSent.date          = new Date(); 

        this.hubConnection
        .invoke('Send', this._messageSent.idContactTo,
                        this._messageSent.message).catch(err => console.error(err));


    }
   
    createConnection(): any {

        this.hubConnection = new HubConnectionBuilder()
        .withUrl(CONFIGURATION.baseUrls.server + 'Chat', 
        { 
           skipNegotiation: true, 
           transport: HttpTransportType.WebSockets
        }) 
        .build();  
    }

    startConnection(): any {

        setTimeout(() => {
            this.hubConnection.start().then(() => { 

            this.connectionEstablished.next(true);
            console.log('Chat Hub Conectado.');
        });
        }, WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS);
    }

    registerOnServerEvents(): void { 
 
        this.hubConnection.on('Send', (data) => {
            console.log('chegou mensagem: ', data);
        }); 

    }

}
