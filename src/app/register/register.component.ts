import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    firstname: null,
    lastname: null,
    age: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$';
  currentUser: any;

  constructor(private authService: AuthService, private token: TokenStorageService, private router: Router, private titleService: Title, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser().username;
    if (this.currentUser) {
      this.router.navigate(['/home']);
    }

    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    })
  }

  async onSubmit(): Promise<void> {
    const { firstname, lastname, age, email, username, password } = this.form;


    this.authService.register(firstname, lastname, age, email, username, password).subscribe(
      async data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.authService.registerKC(firstname, lastname, age, email, username, password).subscribe(
          async data => {
            // console.log(data);
          },
          err => {
            this.errorMessage = err.error.message;
          }
        );

        await this.delay(2000);
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
