import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Community } from "../_entities/community";
import { Member } from "../_entities/member";
import { EnvService } from "./env.service";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class CommunityService {
    
    constructor(private http: HttpClient, private env: EnvService) { }
    
    private apiServerUrl = this.env.communityApiUrl;

    getCommunityById(id: number): Observable<any> {
        return this.http.get(`${this.apiServerUrl}/api/communities/${id}`, httpOptions);
    }

    joinCommunity(member: Member): Observable<any> {
        console.log(member)
        return this.http.post<Member>(`${this.apiServerUrl}/api/communities/join`, member, httpOptions)
    }
    updateLogo(logo: string, id: number): Observable<any> {
        console.log(logo)
        return this.http.put(`${this.apiServerUrl}/api/communities/${id}/logo`, { logo }, httpOptions)
    }
    updateCommunity(id: number, name: any, slogan: any, description: any, domain: any,
        foundationDate: any, founders: any, email: any, website: any): Observable<any> {
        return this.http.put(`${this.apiServerUrl}/api/communities/${id}`, {
            name,
            slogan,
            description,
            domain,
            foundationDate,
            founders,
            email,
            website,
        }, httpOptions)
    }
    getCommunityByName(keyword: string, page: number, size: number): Observable<any> {
        return this.http.post<Community[]>(`${this.apiServerUrl}/api/communities/search/${page}/${size}`, { keyword }, httpOptions)
    }
    getSeachResultCommunitiesNumber(keyword: string): Observable<any> {
        return this.http.post<number>(`${this.apiServerUrl}/api/communities/search`, { keyword }, httpOptions)
    }
}