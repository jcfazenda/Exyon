import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRippleModule, MatTabsModule, MatTooltipModule } from '@angular/material';

import { FuseSharedModule } from '../../../../@fuse/shared.module';

import { ChatPanelComponent } from '../../../../app/layout/components/chat-panel/chat-panel.component';
import { ChatPanelService } from '../../../../app/layout/components/chat-panel/chat-panel.service';
import { SignalRService } from '../../../services/chat-message/signalr.service';

@NgModule({
    declarations: [
        ChatPanelComponent
    ],
    providers   : [
        ChatPanelService,
        SignalRService
    ],
    imports     : [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatTooltipModule,
        MatRippleModule,

        FuseSharedModule
    ],
    exports     : [
        ChatPanelComponent
    ]
})
export class ChatPanelModule
{
}
