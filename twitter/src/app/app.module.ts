
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material-module/angular-material.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { VerificationLinkComponent } from './verification-link/verification-link.component';
import { AuthGuard } from './guard/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { ResendVerificationComponent } from './resend-verification/resend-verification.component';
//import { HttpInterceptorService} from './services/http-interceptor.service'


const routes: Routes = [
  {path: '', redirectTo:'login',pathMatch:'full'},
  {path: 'register', component:RegistrationFormComponent},
  {path: 'login', component:LoginFormComponent},
  {path: 'feed', component:FeedComponent, canActivate: [AuthGuard]},
  {path: 'resendVerificationLink/:id', component: ResendVerificationComponent},
  {path: 'verifyRegistration',component: VerificationLinkComponent},
  {path: 'profile/:id', component: ProfileComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    FeedComponent,
    VerificationLinkComponent,
    ProfileComponent,
    ResendVerificationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
