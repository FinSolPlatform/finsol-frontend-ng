import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CommunityComponent } from './community/community.component';
import { CommunitySearchComponent } from './community-search/community-search.component';
import { MessagesComponent } from './messages/messages.component';
import { ProjectComponent } from './project/project.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { CommunityAddComponent } from './community-add/community-add.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: {title: 'Acceuil'} },
  { path: 'login', component: LoginComponent, data: {title: 'Authentification'} },
  { path: 'register', component: RegisterComponent, data: {title: 'Inscription'} },
  { path: 'profile', component: ProfileComponent, data: {title: 'Profile'} },
  { path: 'project/add', component: ProjectAddComponent, data: {title: 'Nouveau Projet'} },
  { path: 'project/:id', component: ProjectComponent, data: {title: 'Projet'} },
  { path: 'community/search', component: CommunitySearchComponent, data: {title: 'Recherche Communauté'} },
  { path: 'community/add', component: CommunityAddComponent, data: {title: 'Nouvelle Communauté'} },
  { path: 'community/:id', component: CommunityComponent, data: {title: 'Communauté'} },
  { path: 'messages', component: MessagesComponent, data: {title: 'Messages'} },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Wild Card Route for 404 request
  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent,
    data: {title: 'Page Introuvable'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
