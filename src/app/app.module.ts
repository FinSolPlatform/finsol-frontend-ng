import { NgModule } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    ActivatedRoute,
  ],
  providers: [authInterceptorProviders, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
