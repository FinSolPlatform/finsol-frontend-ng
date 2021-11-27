import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_entities/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile-adm',
  templateUrl: './profile-adm.component.html',
  styleUrls: ['./profile-adm.component.css']
})
export class ProfileAdmComponent implements OnInit {

  display: null;
  profileUser: User;
  userId: number;

  constructor(private token: TokenStorageService,
    private titleService: Title,
    private user: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.display = params['show'];
    });

    this.userId = parseInt(activatedRoute.snapshot.url[1].path);

    this.getUserProfile(this.userId);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    })
  }

  public getUserProfile(userId: number): void {
    this.user.getUserById(userId).subscribe(
      (response: User) => {
        this.profileUser = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['not-found-404'])
      }
    )
  }
}
