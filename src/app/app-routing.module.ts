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
import { AuthGuard } from './auth/auth.guard';
import { PermissionDeniedComponent } from './permission-denied/permission-denied.component';
import { ConsoleAdmComponent } from './console-adm/console-adm.component';
import { ProfileAdmComponent } from './profile-adm/profile-adm.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Acceuil' }
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard],
        data: { 
            title: 'Authentification',
            roles: ['ROLE_USER']
        }
        
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Inscription' }
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
        data: {
            title: 'Profile',
            roles: ['ROLE_USER']
        }
    },
    {
        path: 'project/add',
        component: ProjectAddComponent,
        canActivate: [AuthGuard],
        data: { 
            title: 'Nouveau Projet',
            roles: ['ROLE_USER']
         }
    },
    {
        path: 'project/:id',
        component: ProjectComponent,
        data: { title: 'Projet' }
    },
    {
        path: 'community/search',
        component: CommunitySearchComponent,
        data: { title: 'Recherche Communauté' }
    },
    {
        path: 'community/add',
        component: CommunityAddComponent,
        canActivate: [AuthGuard],
        data: { title: 'Nouvelle Communauté',
            roles: ['ROLE_USER']
        }
    },
    {
        path: 'community/:id',
        component: CommunityComponent,
        data: { title: 'Communauté' }
    },
    {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [AuthGuard],
        data: { title: 'Messages', 
            roles: ['ROLE_USER']
        }
    },
    {
        path: 'console-adm',
        component: ConsoleAdmComponent,
        canActivate: [AuthGuard],
        data: { title: 'Console d\'administration', 
            roles: ['ROLE_ADMIN']
        }
    },
    {
        path: 'profile-adm/:id',
        canActivate: [AuthGuard],
        component: ProfileAdmComponent,
        data: {
            title: 'Profile',
            roles: ['ROLE_ADMIN']
        }
    },
    {
        path: 'permission-denied',
        component: PermissionDeniedComponent,
        data: { title: 'Permission Refusée' }
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // Wild Card Route for 404 request
    {
        path: '**', pathMatch: 'full',
        component: PagenotfoundComponent,
        data: { title: 'Page Introuvable' }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
