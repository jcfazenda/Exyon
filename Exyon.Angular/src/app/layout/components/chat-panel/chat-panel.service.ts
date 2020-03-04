import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FuseUtils } from '../../../../@fuse/utils';
import { ChatMessageService } from '../../../services/chat-message/chat-message.service';
import { ChatInputViewModel } from '../../../services/chat-message/chat-message-interface';

@Injectable()
export class ChatPanelService
{
    contacts: any[];
    chats: any[];
    user: any;

    _messageSent: ChatInputViewModel = {
        id:             0,
        message:       '',
        idContactTo:    0,
        idContactFrom:  0,
        date:           new Date(),
        wo: ''
    };
    
    constructor(
        private _httpClient: HttpClient,
        private _chatService: ChatMessageService
    )
    {
    }

    loadContacts(): Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getContacts(),
                this.getUser()
            ]).then(
                ([contacts, user]) => {
                    this.contacts = contacts;
                    this.user = user;
                    resolve();
                },
                reject
            );
        });
    }

    sendChatMessage(Message: ChatInputViewModel): any { 
         
         return this._chatService.SendChat(Message).subscribe(data => {

         }, error => {

         });

    }

    getChat(contactId): Promise<any>
    {
        const chatItem = this.user.chatList.find((item) => {
            return item.contactId === contactId;
        });

        // Get the chat
        return new Promise((resolve, reject) => {

            this._messageSent.idContactFrom = 0;
            this._messageSent.idContactTo   = 0;
            this._messageSent.chatId        = contactId;

            // Se houver um bate-papo com esse usuário, retorne isso.
            if ( chatItem )
            {    
                this._chatService.GetByCriteria(this._messageSent).subscribe(chat => {   
                    resolve(chat.data);    
                }, reject);
                
            } else {

                // Se não houver bate-papo com esse usuário, crie um ...
                // e, em seguida, lembre-se do método getChat
                this.createNewChat(contactId).then(() => { 

                    this.getChat(contactId).then((chat) => {   
                        resolve(chat);
                    });

                });
            }
        });
    }

    createNewChat(contactId): Promise<any>
    {
        return new Promise((resolve, reject) => {

            // Generate a new id
            const chatId = FuseUtils.generateGUID();

            // Prepare the chat object
            const chat = {
                id    : chatId,
                dialog: []
            };

            // Prepare the chat list entry
            const chatListItem = {
                chatId         : chatId,
                contactId      : contactId,
                lastMessageTime: '2017-02-18T10:30:18.931Z'
            }; 

            this.user.chatList.push(chatListItem); // Adicionar novo item da lista de bate-papo à lista de bate-papo do usuário

            // Poste o bate-papo criado no servidor
            this._httpClient.post('api/chat-panel-chats', {...chat}).subscribe(() => {

                // Poste os dados atualizados do usuário no servidor
                this._httpClient.post('api/chat-panel-user/' + this.user.id, this.user).subscribe(() => { 
                    resolve();
                });

            }, reject);

        });
    }

    updateChat(chatId, dialog): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._chatService.GetByCriteria(this._messageSent).subscribe(chat => {   
                resolve(chat.data);    
            }, reject);

        });
    }

    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-panel-contacts')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-panel-user')
                .subscribe((response: any) => {
                    resolve(response[0]);
                }, reject);
        });
    }
}