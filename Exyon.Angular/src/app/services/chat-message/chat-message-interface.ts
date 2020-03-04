
  export class ChatMessage {

      public sent: Date;
    
      constructor(public message: string = '', 
                         date:    string = '') {

        this.sent = new Date(date);

      }

  }
    
    export interface ChatInputViewModel {
      id?:            number; 
      message?:       string; 
      idContactTo?:   number; 
      idContactFrom?: number;  
      group?:         string; 
      date:           Date;
      wo?:            string; 
      chatId?:            string; 
    }
 