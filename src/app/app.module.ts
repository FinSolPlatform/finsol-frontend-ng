import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProjectComponent } from './project/project.component';
import { CommunityComponent } from './community/community.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CommunitySearchComponent } from './community-search/community-search.component';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe-pipe/safe-pipe.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { CommunityAddComponent } from './community-add/community-add.component';
import { EnvServiceProvider } from './_services/env.service.provider';
import { PermissionDeniedComponent } from './permission-denied/permission-denied.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ConsoleAdmComponent } from './console-adm/console-adm.component';
import { ProfileAdmComponent } from './profile-adm/profile-adm.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://sso-devops-tools.apps.na46.prod.nextcle.com/auth',
        realm: 'finsol-realm',
        clientId: 'finsol-frontend',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      bearerExcludedUrls: ['/assets', '/clients/public'],
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProjectComponent,
    CommunityComponent,
    ProfileComponent,
    MessagesComponent,
    PagenotfoundComponent,
    CommunitySearchComponent,
    SafePipe,
    ProjectAddComponent,
    CommunityAddComponent,
    PermissionDeniedComponent,
    ConsoleAdmComponent,
    ProfileAdmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    KeycloakAngularModule
  ],
  providers: [
    authInterceptorProviders,
    Title,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 