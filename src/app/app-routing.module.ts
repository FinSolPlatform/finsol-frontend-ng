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
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'project/add', component: ProjectAddComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'community/search', component: CommunitySearchComponent },
  { path: 'community/add', component: CommunityAddComponent },
  { path: 'community/:id', component: CommunityComponent },
  { path: 'messages', component: MessagesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Wild Card Route for 404 request
  {
    path: '**', pathMatch: 'full',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
