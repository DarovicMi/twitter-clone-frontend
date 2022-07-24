
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material-module/angular-material.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { VerificationLinkComponent } from './verification-link/verification-link.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './guard/auth-guard.service';



const routes: Routes = [
  {path: '', redirectTo:'login',pathMatch:'full'},
  {path: 'users', component: UsersComponent},
  {path: 'register', component:RegistrationFormComponent},
  {path: 'login', component:LoginFormComponent},
  {path: 'feed', component:FeedComponent, canActivate: [AuthGuard]},
  {path: 'verifyRegistration/:id', component: VerificationLinkComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    FeedComponent,
    VerificationLinkComponent,
    UsersComponent
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
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
