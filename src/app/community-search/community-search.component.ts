import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Community } from '../_entities/community';
import { CommunityService } from '../_services/community.service';

@Component({
  selector: 'app-community-search',
  templateUrl: './community-search.component.html',
  styleUrls: ['./community-search.component.css']
})
export class CommunitySearchComponent implements OnInit {

  communities: Community[];
  displayResult: boolean = false;
  key: string;
  isEmpty: boolean;
  searchMode: boolean = false;
  // begin pagination
  currentPage: number;
  pageItemSize: number = 5;
  pagesNbr: number = 1;
  projectsNbr: number;
  // end pagination
  searchForm: any = {
    keyword: null
  }

  constructor(private communityService: CommunityService, private titleService: Title, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    })
  }

  public onSubmit(page: number): void {
    console.log(page)
    this.currentPage = page;
    this.searchMode = true;
    const { keyword } = this.searchForm;
    this.communityService.getCommunityByName(keyword, page, this.pageItemSize).subscribe(
      (response: Community[]) => {
        console.log(response);
        this.communities = response;

        if (this.communities.length == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
        this.getNumberOfCommunities(keyword);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
    this.key = keyword;
    this.displayResult = true;
  }

  public getNumberOfCommunities(keyword: string): void {
    this.communityService.getSeachResultCommunitiesNumber(keyword).subscribe(
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
