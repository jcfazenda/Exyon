import { NgModule } from '@angular/core'; 
import { Login2Module } from '../../../app/main/pages/authentication/login-2/login-2.module';
import { Register2Module } from '../../../app/main/pages/authentication/register-2/register-2.module';
import { ForgotPassword2Module } from '../../../app/main/pages/authentication/forgot-password-2/forgot-password-2.module';
import { ResetPassword2Module } from '../../../app/main/pages/authentication/reset-password-2/reset-password-2.module';
import { LockModule } from '../../../app/main/pages/authentication/lock/lock.module';
import { MailConfirmModule } from '../../../app/main/pages/authentication/mail-confirm/mail-confirm.module'; 
import { Error404Module } from '../../../app/main/pages/errors/404/error-404.module';
import { Error500Module } from '../../../app/main/pages/errors/500/error-500.module'; 

@NgModule({
    imports: [ 
        Login2Module, 
        Register2Module, 
        ForgotPassword2Module, 
        ResetPassword2Module,
        LockModule,
        MailConfirmModule, 
        Error404Module,
        Error500Module, 
    ]
})
export class PagesModule
{

}
