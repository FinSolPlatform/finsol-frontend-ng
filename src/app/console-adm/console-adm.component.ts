import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from '../_entities/community';
import { Project } from '../_entities/project';
import { User } from '../_entities/user';
import { CommunityService } from '../_services/community.service';
import { ProjectService } from '../_services/project.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-console-adm',
  templateUrl: './console-adm.component.html',
  styleUrls: ['./console-adm.component.css']
})
export class ConsoleAdmComponent implements OnInit {

  users: User[];
  communities: Community[];
  projects: Project[];
  display: null;

  constructor(
    private user: UserService,
    private project: ProjectService,
    private community: CommunityService,
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute) {
    
      this.activatedRoute.queryParams.subscribe(params => {
      this.display = params['show'];
    });
    this.getAllUser();
    this.getAllCommunities();
    this.getAllProjects();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    })
  }

  public getAllUser(): void {
    this.user.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getAllCommunities(): void {
    this.community.getAllCommunities().subscribe(
      (response: Community[]) => {
        this.communities = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getAllProjects(): void {
    this.project.getAdmProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public disableUser(id: number): void {
    this.user.disableUser(id).subscribe(
      (response: User) => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  public enableUser(id: number): void {
    this.user.enableUser(id).subscribe(
      (response: User) => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  public disableCommunity(id: number): void {
    this.community.disableCommunity(id).subscribe(
      (response: Community) => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  public enableCommunity(id: number): void {
    this.community.enableCommunity(id).subscribe(
      (response: Community) => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  public disableProject(id: number): void {
    this.project.disableProject(id).subscribe(
      (response: Project) => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  public enableProject(id: number): void {
    this.project.enableProject(id).subscribe(
      (response: Project) => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
}
