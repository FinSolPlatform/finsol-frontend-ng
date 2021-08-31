import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../_entities/project';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Project[];
  recentProjects: Project[];
  displayResult: boolean = false;
  key: string;
  isEmpty: boolean;
  searchMode: boolean = false;
  page: number = 1;
  searchForm: any = {
    keyword: null
  }

  constructor(private projectService: ProjectService,  private activatedRoute: ActivatedRoute) {
    this.getRecentProject();
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.searchMode = true;
    const { keyword } = this.searchForm;
    this.projectService.getProjectByName(keyword, this.page).subscribe(
      (response: Project[]) => {
        this.projects = response;

        if (this.projects.length == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
    this.key = keyword;
    this.displayResult = true;
  }

  public getRecentProject(): void {
    this.projectService.getLatestProjects().subscribe(
      (response: Project[]) => {
        this.recentProjects = response.slice(response.length-5, response.length).reverse();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
