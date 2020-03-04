import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '../../../../../@fuse/services/config.service';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { UsuarioInput } from '../../../../../app/services/models/user-interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../app/services/api/auth.service'; 

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit
{        
    _user: UsuarioInput = {
        idUsuario:  1, 
        email:      '',
        senha:      '' ,
        rota:       'User/Connect'
    };
      
    loginForm: FormGroup;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    )
    {
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email: ['julio.fazenda@e-xyon.com.br', [Validators.required, Validators.email]],
            senha: ['', Validators.required]
        });
    }

    connect(): any {    
   
        this._user.email = this.loginForm.value.email;
        this._user.senha = this.loginForm.value.senha;  

        return this.authService.Send(this._user).subscribe(data => {  

            this.authService.setUser(data.data);
            this.authService.setToken(data.data);   

            this.router.navigate(['/pages/errors/error-404']);

        }, error => {
              
        }); 

    }

}
