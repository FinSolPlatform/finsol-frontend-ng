import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from '../_services/community.service';
import { UserService } from '../_services/user.service';
import { Community } from '../_entities/community';
import { User } from '../_entities/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { Member } from '../_entities/member';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  display: null;
  communityId!: number;
  community: Community;
  communityMembers: User[] = [];
  member: Member;
  token!: string;
  loggedUser: string;
  isLoggedIn: any;
  isOwner = false;
  isMember: boolean = false;
  isMemberStatus: string;
  url: string;
  isLogoUpdateSucceded: boolean = false;
  isCommunityUpdateSucceded: boolean = false;
  successMessage = '';
  errorMessage = '';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$';
  domains = [
    { id: 'sport', value: 'Sport' },
    { id: 'energie', value: 'Energie' },
    { id: 'santé', value: 'Santé' },
    { id: 'environnement', value: 'Environnement' },
    { id: 'education', value: 'Education' },
    { id: 'animaux', value: 'Animaux' },
    { id: 'artisanal', value: 'Artisanal' },
    { id: 'autre', value: 'Autre' },
  ];
  logoForm: any = {
    logo: null
  }
  communityForm: any = {
    name: null,
    slogan: null,
    description: null,
    domain: null,
    foundationDate: null,
    founders: null,
    email: null,
    website: null,
  }
  searchForm: any = {
    keyword: null,
  }
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private communityService: CommunityService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private readonly keycloak: KeycloakService,
    private router: Router,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.display = params['show'];
    });

    
    this.communityId = parseInt(activatedRoute.snapshot.url[1].path);
    this.url = (this.router.url);
    this.getCommunity(this.communityId);
    // get logged user name
    this.isLogged();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    })
  }

  async isLogged() {
    this.isLoggedIn = await this.keycloak.getUsername();

    if (this.isLoggedIn) {
      // console.log(this.isLoggedIn)
      this.isLoggedIn = true;

      this.userService.getUserByUsername(this.keycloak.getUsername()).subscribe(
        response => {
          this.loggedUser = response.username;
          this.user = response;
        },
        err => {
          this.errorMessage = err.error.message;
        }
      )
    } else {
      this.isLoggedIn = false;
    }
  }

  public join() {
    this.member = {
      username: this.loggedUser,
      community_id: this.communityId.toString(),
    }
    this.communityService.joinCommunity(this.member).subscribe(
      response => {
        console.log(response)
        window.location.reload();
      },
      err => {
        console.log(err.error)
      }
    );
  }

  public getCommunity(id: number): void {
    this.communityService.getCommunityById(id).subscribe(
      (response: Community) => {
        console.log(response)
        this.community = response;
        this.community.creationDate = this.community.creationDate.substr(0, 10).split("-").reverse().join("/");
        this.community.foundationDate = this.community.foundationDate.substr(0, 10).split("-").reverse().join("/");
        // console.log(this.community.foundationDate)
        response.member.forEach(element => {
          this.userService.getUserByUsername(element.username).subscribe(
            data => {
              this.communityMembers.push(data);
              this.communityMembers.forEach(element => {
                if (element.username == this.loggedUser) {
                  this.isMember = true;
                }
              });
              // check user is admin of community
              if (this.community.owner == (this.user.id + '') ||
                this.loggedUser == 'admin') {
                this.isOwner = true;
              }
              // community edit form 
              this.communityForm['name'] = this.community.name;
              this.communityForm['slogan'] = this.community.slogan;
              this.communityForm['description'] = this.community.description;
              this.communityForm['domain'] = this.community.domain;
              this.communityForm['foundationDate'] = this.community.foundationDate;
              this.communityForm['founders'] = this.community.founders;
              this.communityForm['email'] = this.community.email;
              this.communityForm['website'] = this.community.website;
            }
            );
          });
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(["/error"]);
        console.log(error.message);
      }
    )
  }

  async onSubmitCommunity(): Promise<void> {
    const {
      name,
      slogan,
      description,
      domain,
      foundationDate,
      founders,
      email,
      website,
    } = this.communityForm;

    this.communityService.updateCommunity(this.communityId, name, slogan, description, domain, foundationDate, founders, email, website).subscribe(
      async response => {
        console.log(response)
        this.isCommunityUpdateSucceded = true;
        this.successMessage = response.message;
        await this.delay(1500);
        this.reloadPage();
      },
      err => {
        this.isCommunityUpdateSucceded = false;
        this.errorMessage = err.error.message;
      }
    )
  }

  //  don't work
  public onSubmitSearch(): void {
    const { keyword } = this.searchForm;
  }

  async onSubmitLogo(): Promise<void> {
    const { logo } = this.logoForm;

    this.communityService.updateLogo(logo, this.communityId).subscribe(
      async response => {
        this.isLogoUpdateSucceded = true;
        await this.delay(1500);
        this.reloadPage();
      },
      err => {
        this.isLogoUpdateSucceded = false;
      }
    )
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  reloadPage(): void {
    window.location.reload();
  }
}
