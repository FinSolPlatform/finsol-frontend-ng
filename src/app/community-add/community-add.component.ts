import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CommunityService } from '../_services/community.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-community-add',
  templateUrl: './community-add.component.html',
  styleUrls: ['./community-add.component.css']
})
export class CommunityAddComponent implements OnInit {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$';
  domains = [
    {id: 'sport', value: 'Sport'},
    {id: 'energie', value: 'Energie'},
    {id: 'santé', value: 'Santé'},
    {id: 'environnement', value: 'Environnement'},
    {id: 'education', value: 'Education'},
    {id: 'animaux', value: 'Animaux'},
    {id: 'artisanal', value: 'Artisanal'},
    {id: 'autre', value: 'Autre'},
  ];
  isSuccessful: boolean = false;
  successMessage = '';
  errorMessage = '';
  loggedUser = '';
  form: any = {
    name: null, 
    slogan: null, 
    description: null, 
    domain: null, 
    foundationDate: null, 
    founders: null, 
    email: null, 
    website: null, 
  }

  constructor(
    private communityService: CommunityService,
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private readonly keycloak: KeycloakService,
  ) { 
    this.loggedUser = this.keycloak.getUsername();
    console.log(this.loggedUser)
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    })
  }

  public onSubmit(): void {
    const { name, slogan, description, domain, foundationDate, founders, email, website } = this.form;

    this.communityService.createCommunity(
      name, slogan, description, domain, foundationDate, founders, email, website, this.loggedUser).subscribe(
      response => {
        console.log(response)
        this.router.navigate([`/community/${response.id}`])
        this.successMessage = response.message;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }

}
