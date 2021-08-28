import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../_entities/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { ConfirmedValidator } from './confirmed.validator';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  doc: any;
  display: null;

  currentUser: any;
  currentToken: any;

  profileUser!: User;
  isLoggedIn = true;

  successMessage = '';
  errorMessage = '';

  isPassUpdateSucceded = false;
  isPassUpdateFailed = false;
  isAvatarUpdateSucceded = false;
  isUserUpdateSucceded = false;

  form: any = {
    old_passwd: null,
    new_passwd: null,
  };
  avatarForm: any = {
    photo: null
  }
    ;
  userForm: any = {
    firstname: null,
    lastname: null,
    age: null,
    biography: null
  }

  constructor(private token: TokenStorageService,
    private user: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    @Inject(DOCUMENT) private document: Document) {

    this.doc = document;

    this.activatedRoute.queryParams.subscribe(params => {
      this.display = params['show'];
    });

    this.currentUser = this.token.getUser().username;

    if (!this.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.currentToken = this.token.getToken();
      this.getUserProfile();

    }
  }

  ngOnInit(): void {
  }

  public getUserProfile(): void {
    this.user.getUserByUsername(this.currentUser, this.currentToken).subscribe(
      (response: User) => {
        this.profileUser = response;

        this.userForm['firstname'] = this.profileUser.firstName
        this.userForm['lastname'] = this.profileUser.lastName
        this.userForm['age'] = this.profileUser.age
        this.userForm['biography'] = this.profileUser.biography
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  async onSubmitPassword(): Promise<void> {
    const { old_passwd, new_passwd } = this.form;

    this.user.updatePassword(this.currentUser, old_passwd, new_passwd).subscribe(
      async data => {
        this.successMessage = data.message;
        this.isPassUpdateSucceded = true;
        this.isPassUpdateFailed = false;
        await this.delay(1500);
        this.doc.getElementById('passModalClose').click();
        this.isLoggedIn = false;
        this.logout();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isPassUpdateFailed = true;
        this.isPassUpdateSucceded = false;
      }
    );
  }

  async onSubmitAvatar(): Promise<void> {
    const { photo } = this.avatarForm;

    this.user.updateAvatar(this.profileUser.username, photo).subscribe(
      async response => {
        this.isAvatarUpdateSucceded = true;
        await this.delay(1500);
        this.reloadPage();
      },
      err => {
        this.isAvatarUpdateSucceded = false;
      }
    )
  }

  async onSubmitUser(): Promise<void> {
    const { firstname, lastname, age, biography } = this.userForm;

    this.user.updateUserProfile(this.profileUser.username, firstname, lastname, age, biography).subscribe(
      async response => {
        console.log(response)
        this.isUserUpdateSucceded = true;
        this.successMessage = response.message;
        await this.delay(1500);
        this.reloadPage();
      },
      err => {
        this.isUserUpdateSucceded = false;
        this.errorMessage = err.error.message;
      }
    )
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  reloadPage(): void {
    window.location.reload();
  }
}