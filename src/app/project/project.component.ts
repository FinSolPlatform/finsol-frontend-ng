import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery } from '../_entities/gallery';
import { PlanItem } from '../_entities/plan-item';
import { Project } from '../_entities/project';
import { User } from '../_entities/user';
import { ProjectService } from '../_services/project.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  display: null;
  project: Project;
  isProjectUpdateSucceded: boolean = false;
  isCoverUpdateSucceded: boolean = false;
  loggedUser: string;
  isLoggedIn = false;
  isOwner = false;
  successMessage = '';
  errorMessage = '';
  commentForm: any = {
    message: null,
  }
  searchForm: any = {
    keyword: null,
  }
  projectForm: any = {
    name: null,
    budget: null,
    description: null,
    location: null
  }
  coverForm: any = {
    cover: null
  }

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.display = params['show'];
    });
    this.getProject(parseInt(activatedRoute.snapshot.url[1].path))

    this.loggedUser = this.tokenStorageService.getUser().username;
    if (this.loggedUser)
      this.isLoggedIn = true;

  }

  ngOnInit(): void {
  }

  public getProject(id: number): void {
    this.projectService.getProjectById(id).subscribe(
      (response: Project) => {
        console.log(response.comment);
        this.project = response;
        for (let index = 0; index < response.comment.length; index++) {
          this.userService.getUserByUsername(response.comment[index].username, this.tokenStorageService.getToken()).subscribe(
            user => {
              this.project.comment[index].userPrettyName = user.firstName + ' ' + user.lastName;
              this.project.comment[index].userLogo = user.photo;
            }
          );
        }
        this.project.comment.sort((a, b) => (a.id > b.id) ? 1 : -1);
        // fomat creation date
        this.project.creationDate = this.project.creationDate.split(' ')[0].split('-').reverse().join('/') + ' ' +
          this.project.creationDate.split(' ')[1].substr(0, 5)
        // check user is admin of community
        if (this.project.owner.toLowerCase() == this.loggedUser ||
          this.loggedUser == 'admin') {
          this.isOwner = true;
        }
        // project edit form 
        this.projectForm['name'] = this.project.name;
        console.log(this.project.budget)
        this.projectForm['budget'] = this.project.budget;
        this.projectForm['description'] = this.project.description;
        this.projectForm['location'] = this.project.location;
        this.coverForm['cover'] = this.project.photo;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public getPlan(id: number): void {
    this.projectService.getProjectPlan(id).subscribe(
      (response: PlanItem[]) => {
        this.project.plan = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  public onSubmitComment(): void {
    const { message } = this.commentForm;

    this.projectService.addComment(this.project.id, message, this.tokenStorageService.getUser().username, "0", this.project).subscribe(
      response => {
        console.log(response)
        this.reloadPage();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  //  don't work
  public onSubmitSearch(): void {
    const { keyword } = this.searchForm;
  }

  public onSubmitProject(): void {
    const { name, budget, location, description } = this.projectForm;

    this.project.name = name;
    this.project.budget = budget;
    this.project.description = description;
    this.project.location = location;

    this.projectService.updateProject(this.project).subscribe(
      async response => {
        console.log(response)
        this.isProjectUpdateSucceded = true;
        this.successMessage = response.message;
        await this.delay(1500);
        this.reloadPage();
      },
      err => {
        this.isProjectUpdateSucceded = false;
        this.errorMessage = err.error.message;
      }
    )
  }

  public onSubmitCover(): void {
    const { cover } = this.coverForm;
    this.projectService.updateCover(cover, this.project.id).subscribe(
      async response => {
        this.isCoverUpdateSucceded = true;
        await this.delay(1500);
        this.reloadPage();
      },
      err => {
        this.isCoverUpdateSucceded = false;
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
