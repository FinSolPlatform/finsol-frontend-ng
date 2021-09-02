import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../_services/project.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  isSuccessful: boolean = false;
  loggedUser: string;
  successMessage = '';
  errorMessage = '';
  form: any = {
    name: null,
    budget: null,
    description: null,
    location: null,
    cover: null,
  }

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) { 
    this.loggedUser = this.tokenStorageService.getUser().username;
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    const { name, budget, location, description, cover } = this.form;

    this.projectService.addProject(name, description, location, this.loggedUser, cover, budget).subscribe(
      response => {
        console.log(response)
        this.router.navigate([`/project/${response.id}`])
        this.successMessage = response.message;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }
}
