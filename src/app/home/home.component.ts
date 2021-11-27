import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Project } from '../_entities/project';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() searchKey: any;
  projects: Project[];
  recentProjects: Project[];
  displayResult: boolean = false;
  key: string;
  isEmpty: boolean;
  searchMode: boolean = false;
  // begin pagination
  currentPage: number;
  pageItemSize: number = 1;
  pagesNbr: number = 1;
  projectsNbr: number;
  // end pagination
  searchForm: any = {
    keyword: null
  }

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router) {
       this.getRecentProject();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    })
  }

  public onSubmit(page: number): void {
    this.currentPage = page;
    this.searchMode = true;
    const { keyword } = this.searchForm;
    this.searchProjects(page, keyword)
    this.getNumberOfProject(keyword);
  }

  public searchProjects(page: any, keyword: any): void {
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
        this.recentProjects = response.slice(-5).reverse();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public getNumberOfProject(keyword: string): void {
    this.projectService.getSeachResultProjectsNumber(keyword).subscribe(
      (response: number) => {
        this.projectsNbr = response;
        this.pagesNbr = Math.ceil(this.projectsNbr / this.pageItemSize);
        console.log(this.projectsNbr)
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
