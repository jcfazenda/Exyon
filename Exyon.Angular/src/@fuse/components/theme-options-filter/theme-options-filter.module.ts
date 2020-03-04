import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatOptionModule, MatRadioModule, MatSelectModule, MatSlideToggleModule
} from '@angular/material';

import { FuseDirectivesModule } from '../../../@fuse/directives/directives';
import { FuseMaterialColorPickerModule } from '../../../@fuse/components/material-color-picker/material-color-picker.module';
import { FuseSidebarModule } from '../../../@fuse/components/sidebar/sidebar.module';

import { FuseThemeOptionsFilterComponent } from '../../../@fuse/components/theme-options-filter/theme-options-filter.component';

@NgModule({
    declarations: [
        FuseThemeOptionsFilterComponent
    ],
    imports     : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,

        FuseDirectivesModule,
        FuseMaterialColorPickerModule,
        FuseSidebarModule
    ],
    exports     : [
        FuseThemeOptionsFilterComponent
    ]
})
export class FuseThemeOptionsFilterModule
{
}
