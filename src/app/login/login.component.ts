import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  formModal: any = {
    email: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$';
  validEmail = '';
  validEmailMessage = '';

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private keycloak: KeycloakService) {
  }

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    //   this.router.navigate(['/home']);
    // }

    // this.activatedRoute.data.subscribe(data => {
    //   this.titleService.setTitle(data.title);
    // })

    this.router.navigateByUrl("/home");
  }

  onSubmitLogin(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  async onSubmitForget(): Promise<void> {
    const { email } = this.formModal;

    this.authService.reset(email).subscribe(
      async data => {
        console.log(data.message);
        this.validEmailMessage = data.message;
        this.validEmail = 'true';
        await this.delay(2000);
        this.reloadPage();
      },
      err => {
        if (err.error.status == '404') {
          console.log("Aucun utilisateur n'a été trouvé avec cette adresse e-mail")
          this.validEmail = 'false';
        }
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
