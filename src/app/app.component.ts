import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './_services/token-storage.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { config } from 'rxjs/internal/config';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  errorMessage?: string;
  title: string = "Finsol Platform";
  // keycloak
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private titleService: Title,
    private authService: AuthService,
    // keycloak
    private readonly keycloak: KeycloakService,
    private userService: UserService) {

    this.isLogged();

  }

  OnInit() {
    this.titleService.setTitle("Finsol Platform");
  }

  async isLogged() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {

      this.isLoggedIn = true;

      this.userProfile = await this.keycloak.loadUserProfile();
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;


      this.userService.getUserByUsername(this.keycloak.getUsername()).subscribe(
        response => {
          // console.log(response)
          this.username = response.username;
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )

    } else {
      this.isLoggedIn = false;
    }
  }

  public logout() {
    this.keycloak.logout();
  }
}
