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
  // begin pagination
  currentPage: number;
  pageItemSize: number = 2;
  pagesNbr: number = 1;
  projectsNbr: number;
  // end pagination
  searchForm: any = {
    keyword: null
  }

  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) {
    this.getRecentProject();
    this.getNumberOfProject();
  }

  ngOnInit(): void {
  }

  public onSubmit(page: number): void {
    console.log(page)
    this.currentPage = page;
    this.searchMode = true;
    const { keyword } = this.searchForm;
    this.projectService.getProjectByName(keyword, page, this.pageItemSize).subscribe(
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
        this.recentProjects = response.slice(response.length - 5, response.length).reverse();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getNumberOfProject(): void {
    this.projectService.getNumberOfProject().subscribe(
      (response: number) => {
        this.projectsNbr = response;
        this.pagesNbr = Math.ceil(this.projectsNbr / this.pageItemSize);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  //function to return list of numbers from 0 to n-1
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
