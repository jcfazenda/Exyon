import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../../../@fuse/animations';

import { ChatService } from '../../../../../../app/main/apps/chat/chat.service'; 

@Component({
    selector     : 'chat-left-sidenav',
    templateUrl  : './left.component.html',
    styleUrls    : ['./left.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChatLeftSidenavComponent implements OnInit, OnDestroy
{ 
    view: string;

    private _unsubscribeAll: Subject<any>;

    constructor(private _chatService: ChatService
    )
    {
        this.view = 'chats';
        this._unsubscribeAll = new Subject();

        
    } 

    ngOnInit(): void
    {
        this._chatService.onLeftSidenavViewChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(view => { this.view = view;
        });
        
    }


    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
