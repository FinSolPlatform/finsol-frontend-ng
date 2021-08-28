import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  searchForm: any = {
    keyword: null
  }

  constructor(
    private communityService: CommunityService,
  ) {
    
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    const { keyword } = this.searchForm;
    this.communityService.getCommunityByName(keyword).subscribe(
      (response: Community[]) => {
        console.log(response);
        this.communities =  response;
        
        if (this.communities.length == 0) {
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
}
