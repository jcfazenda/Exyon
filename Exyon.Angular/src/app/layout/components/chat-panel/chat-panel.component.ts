import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation, NgZone } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '../../../../@fuse/components/sidebar/sidebar.service';
import { FusePerfectScrollbarDirective } from '../../../../@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { ChatPanelService } from '../../../../app/layout/components/chat-panel/chat-panel.service'; 
import { ChatMessage, ChatInputViewModel } from '../../../services/chat-message/chat-message-interface';

import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import { CONFIGURATION } from '../../../../app/services/chat-message/chat-configuration'; 
import { ContactsInputViewModel } from '../../../../app/services/models/contacts-interface'; 

const WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS = 2000;

@Component({
    selector     :  'chat-panel',
    templateUrl  :  './chat-panel.component.html',
    styleUrls    : ['./chat-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatPanelComponent implements OnInit, AfterViewInit, OnDestroy
{  
    private hubConnection: HubConnection;
    messageReceived           = new Subject<ChatMessage>();
    newCpuValue               = new Subject<Number>();
    connectionEstablished     = new Subject<Boolean>();

    idUser = 0;
    idTo   = 0;
    chatId  = '';

    _messageSent: ChatInputViewModel = {
        id:             0,
        message:       '',
        idContactTo:    0,
        idContactFrom:  0,
        date:           new Date(),
        wo: '',
        chatId: ''
    };

    _contacts: ContactsInputViewModel = {
        id: 0,
        idUsuario: 0
    };

    // ** ** //
    mensagemSent = '';
    currentMessage: ChatMessage = new ChatMessage();
    allMessages:    ChatMessage[] = [];
    canSendMessage: boolean;  
 
    contacts: any[];
    chat: any;
    selectedContact: any;
    sidebarFolded: boolean;

    user: any;

    @ViewChild('replyForm')
    set replyForm(content: NgForm)
    {
        this._replyForm = content;
    }

    @ViewChild('replyInput')
    set replyInput(content: ElementRef)
    {
        this._replyInput = content;
    }

    @ViewChildren(FusePerfectScrollbarDirective)
    private _fusePerfectScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;

    private _chatViewScrollbar: FusePerfectScrollbarDirective;
    private _replyForm: NgForm;
    private _replyInput: ElementRef;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _chatPanelService: ChatPanelService,
        private _fuseSidebarService: FuseSidebarService,
        private ngZone: NgZone)
    {
        this.selectedContact = null;
        this.sidebarFolded = true;
        this._unsubscribeAll = new Subject(); 

        this.idUser = Number(localStorage.getItem('idUsuario'));

        this.createConnection();
        this.startConnection();  
        this.registerOnServerEvents(this.idUser ); 
    }

    ngOnInit(): void
    {  
        this._chatPanelService.loadContacts().then(() => { 
            // this.contacts = this._chatPanelService.contacts;
            this.user     = this._chatPanelService.user;  
        });

        this._fuseSidebarService.getSidebar('chatPanel').foldedChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((folded) => { this.sidebarFolded = folded;
        });

        this.subscribeToEvents();

       // this.GetContacts();
    } 

    private subscribeToEvents(): void {
          
        this.connectionEstablished.subscribe(() => {
          this.canSendMessage = true;
        });
    
        this.messageReceived.subscribe((message: ChatMessage) => {
          this.ngZone.run(() => {

            this.currentMessage = new ChatMessage();
            this.allMessages.push(new ChatMessage(message.message, message.sent.toString()));

          });
        });
    }

    /**  CHAT HUB **/
    sendChatMessage(message: string): any {  
        
        console.log('sending message..');

        this._messageSent.id 	        = 56; 
        this._messageSent.message       = message; 
        this._messageSent.idContactFrom = this.idUser; 
        this._messageSent.idContactTo   = this.selectedContact.id; 
        this._messageSent.group         =  'grp_' + this.selectedContact.id; 
        this._messageSent.wo            =  this.user.id;  
        this._messageSent.chatId        =  this.chatId;  

    }

    createConnection(): any {

        console.log('criando conexao hub..');

        this.hubConnection = new HubConnectionBuilder()
        .withUrl(CONFIGURATION.baseUrls.server + 'ChatHub', 
        { 
           skipNegotiation: true, 
           transport: HttpTransportType.WebSockets
        }) 
        .build();  
    }
    startConnection(): any {

        console.log('Conectando hub..');

        setTimeout(() => {
            this.hubConnection.start().then(() => { 

            this.connectionEstablished.next(true);
            console.log('Chat Hub Conectado.');
        });
        }, WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS);

    }
    registerOnServerEvents(id: number): void { 
  
        /* abre conexao com SignalR e aguarda mensagens */
        const Group = 'grp_' + id; 
        this.hubConnection.on(Group, (data) => {   
             
            if (this.selectedContact.id === data.idContactTo) {
                this._messageSent = data; 
                this.replyMessage(this._messageSent); 
            }  
        }); 

    }

    replyMessage(data: ChatInputViewModel): void { 

        const message = {
            wo    : data.wo,
            message: data.message,
            date   : new Date().toISOString()
        }; 

        this.chat.dialog.push(message);     // Add the message to the chat  
        this._replyForm.reset();            // Reset the reply form 
        this._prepareChatForReplies();

    }

    /**  **/

    shouldShowContactAvatar(message, i): boolean
    {   
        if (message.wo != this.user.id) {
            return ( 
                ((this.chat.dialog[i + 1] && this.chat.dialog[i + 1].who !== this.selectedContact.id) || !this.chat.dialog[i + 1])
            );
        } 
    }

    toggleChat(contact): void
    {   
        this.resetChat();

        this.chatId = this.idUser + contact.id;

        // Se o contato for igual ao contato selecionado, isso significa que vamos desmarcar o contato e descarrega o chat
        if ( this.selectedContact && contact.id === this.selectedContact.id )
        {
            this.resetChat();
        }

        // Caso contrário, vamos selecionar o contato, abrir a barra lateral e iniciar o bate-papo
        else
        {
            this.unfoldSidebarTemporarily();
            this.selectedContact = contact; 
            
            this._chatPanelService.getChat(this.chatId).then((chat) => {
                this.chat = chat;  
                this._prepareChatForReplies(); // Prepare o chat para as respostas
            });

        }
    }
    
    reply(event): void
    { 
        event.preventDefault(); 

        if ( !this._replyForm.form.value.message )
        {
            return;
        }  
        this.sendChatMessage(this._replyForm.form.value.message); 
    }

    ngAfterViewInit(): void
    {
        this._chatViewScrollbar = this._fusePerfectScrollbarDirectives.find((directive) => {
            return directive.elementRef.nativeElement.id === 'messages';
        });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    private _prepareChatForReplies(): void
    {
        setTimeout(() => {

            if ( this._chatViewScrollbar )
            {
                this._chatViewScrollbar.update();

                setTimeout(() => {
                    this._chatViewScrollbar.scrollToBottom(0);
                });
            }
        });
    }

    foldSidebarTemporarily(): void
    {
        this._fuseSidebarService.getSidebar('chatPanel').foldTemporarily();
    }

    unfoldSidebarTemporarily(): void
    {
        this._fuseSidebarService.getSidebar('chatPanel').unfoldTemporarily();
    }

    toggleSidebarOpen(): void
    {
        this._fuseSidebarService.getSidebar('chatPanel').toggleOpen();
    } 

    isFirstMessageOfGroup(message, i): boolean
    {
        return (i === 0 || this.chat.dialog[i - 1] && this.chat.dialog[i - 1].who !== message.who);
    }

    isLastMessageOfGroup(message, i): boolean
    {
        return (i === this.chat.dialog.length - 1 || this.chat.dialog[i + 1] && this.chat.dialog[i + 1].who !== message.who);
    }

    resetChat(): void
    {
        // Set the selected contact as null
        this.selectedContact = null;

        // Set the chat as null
        this.chat = null;
    } 
}