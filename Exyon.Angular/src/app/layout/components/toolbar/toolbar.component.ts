import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { FuseSidebarService } from '../../../../@fuse/components/sidebar/sidebar.service';

import { navigation } from '../../../../app/navigation/navigation'; 
import { UsuarioInput } from '../../../services/models/user-interface';
import { AuthService } from '../../../services/api/auth.service';
import { Router } from '@angular/router';

@Component({
    selector     : 'toolbar',
    templateUrl  : './toolbar.component.html',
    styleUrls    : ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    UserNome   = '';
    UserAvatar = '';

    _user: UsuarioInput = {
        idUsuario:   2, 
        email:      '',
        senha:      '' 
    };

    horizontalNavbar:   boolean;
    rightNavbar:        boolean;
    hiddenNavbar:       boolean;
    languages:          any;
    navigation:         any;
    selectedLanguage:   any;
    userStatusOptions:  any[];

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private router: Router,
        private authService: AuthService)
    {
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'us'
            },
            {
                id   : 'tr',
                title: 'Turkish',
                flag : 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    { 
        this._user.idUsuario = Number(localStorage.getItem('idUsuario'));
        this.GetUser();

        // Subscribe to the config changes
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((settings) => {
            this.horizontalNavbar   = settings.layout.navbar.position   === 'top';
            this.rightNavbar        = settings.layout.navbar.position   === 'right';
            this.hiddenNavbar       = settings.layout.navbar.hidden     === true;
        });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {'id': this._translateService.currentLang}); 
        
    }

    GetUser(): any { 

        this._user.rota = 'User/Get';

        return this.authService.Send(this._user).subscribe(data => {  

          this.UserNome     = data.data.nome + ` ` + data.data.sobreNome;
          this.UserAvatar   = 'assets/images/avatars/' + data.data.avatar; 

        }, error => {

        });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    search(value): void
    {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang): void
    {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    logoutUser(): any { 
        this.router.navigate(['//pages/auth/login-2']);
    }

}
