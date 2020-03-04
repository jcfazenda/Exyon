import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '../../../../../../@fuse/services/config.service';
import { FuseNavigationService } from '../../../../../../@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '../../../../../../@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '../../../../../../@fuse/components/sidebar/sidebar.service';

import { UsuarioOutputViewModel, UsuarioInput } from '../../../../../services/models/user-interface';
import { AuthService } from '../../../../../services/api/auth.service';

@Component({
    selector     : 'navbar-vertical-style-1',
    templateUrl  : './style-1.component.html',
    styleUrls    : ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy
{
    Nome   = `..`;
    Avatar = `..`;
    Email  = `..`;

    user: any;    
    _user: UsuarioInput = {
        idUsuario:    0, 
        email:      '',
        senha:      '' 
    };

    fuseConfig: any;
    navigation: any;

    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,
        private authService: AuthService) {

        this._unsubscribeAll = new Subject();
    }

    @ViewChild(FusePerfectScrollbarDirective)
    set directive(theDirective: FusePerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._fuseNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._fusePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                    setTimeout(() => {
                        const activeNavItem: any = document.querySelector('navbar .nav-link.active');
                    });
                }
            );
    }

    ngOnInit(): void
    {
        this.GetUser(Number(localStorage.getItem('idUsuario')));

        this._router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll)).subscribe(() => {
                    if ( this._fuseSidebarService.getSidebar('navbar') )
                    {
                        this._fuseSidebarService.getSidebar('navbar').close();
                    }
            }
        );

        // Subscribe to the config changes
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((config) => {
                this.fuseConfig = config;
        });

        // Get current navigation
        this._fuseNavigationService.onNavigationChanged.pipe(filter(value => value !== null),takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.navigation = this._fuseNavigationService.getCurrentNavigation();
        });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    GetUser(id: number): any { 

        this._user.idUsuario   = id; 
        this._user.rota   = 'User/Get'; 

        return this.authService.Send(this._user).subscribe(data => { 
                
            this.user   = data.data;
            this.Nome   = data.data.nome + ` ` + data.data.sobreNome;
            this.Email  = data.data.email;
            this.Avatar = 'assets/images/avatars/' + data.data.avatar;  

        }, error => {

        });
    }

    toggleSidebarOpened(): void
    {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    }

    toggleSidebarFolded(): void
    {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }
}
