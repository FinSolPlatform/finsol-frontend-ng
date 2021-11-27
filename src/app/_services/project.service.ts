import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlanItem } from "../_entities/plan-item";
import { Project } from "../_entities/project";
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) { }

    private apiServerUrl = environment.apiBaseUrl;

    getProjectByName(keyword: string, page: number, size: number): Observable<any> {
        return this.http.post<Project[]>(`${this.apiServerUrl}/projects/search/${page}/${size}`, { keyword }, httpOptions)
    }

    getLatestProjects(): Observable<any> {
        return this.http.get<Project[]>(`${this.apiServerUrl}/projects`)
    }

    getProjectById(id: number): Observable<any> {
        return this.http.get<Project[]>(`${this.apiServerUrl}/projects/${id}`)
    }

    getProjectPlan(id: number): Observable<any> {
        return this.http.get<PlanItem[]>(`${this.apiServerUrl}/project/${id}/plan`)
    }

    addComment(id: number, message: string, username: string, replyTo: string, project: Project): Observable<any> {
        return this.http.post(`${this.apiServerUrl}/project/${id}/comment`, {
            message,
            username,
            replyTo,
            project
        }, httpOptions)
    }

    getSeachResultProjectsNumber(keyword: string): Observable<any> {
        return this.http.post<number>(`${this.apiServerUrl}/projects/search`, { keyword }, httpOptions)
    }

    getAllProjects(): Observable<any> {
        return this.http.get(`${this.apiServerUrl}/projects`)
    }

    getAdmProjects(): Observable<any> {
        return this.http.get(`${this.apiServerUrl}/projects/all`)
    }

    addProject(
        name: string, description: string, location: string, owner: string, photo: string, budget: string): Observable<any> {
        return this.http.post<number>(`${this.apiServerUrl}/projects`, {
            name,
            description,
            location,
            owner,
            photo,
            budget,
        }, httpOptions)
    }

    updateProject(project: Project): Observable<any> {
        return this.http.put<number>(`${this.apiServerUrl}/projects/${project.id}`, {
            budget: project.budget,
            description: project.description,
            location: project.location,
            name: project.name
        }, httpOptions)
    }

    updateCover(photo: string, id: number): Observable<any> {
        return this.http.put(`${this.apiServerUrl}/projects/${id}/photo`, { photo }, httpOptions)
    }

    addPlan(title: any, description: any, date: any, budget: any, timelinePosition: any, progressPercent: any, id: number): Observable<any> {
        return this.http.post<number>(`${this.apiServerUrl}/project/${id}/plan`, {
            title, description, date, budget, timelinePosition, progressPercent
        }, httpOptions)
    }

    updatePlan(title: any, description: any, date: any, budget: any, timelinePosition: any, progressPercent: any, id: number, project: number): Observable<any> {
        return this.http.put<number>(`${this.apiServerUrl}/project/${project}/plan/${id}`, {
            title, description, date, budget, timelinePosition, progressPercent
        }, httpOptions)
    }

    deletePlan(id: number, project: number): Observable<any> {
        return this.http.delete<number>(`${this.apiServerUrl}/project/${project}/plan/${id}`)
    }

    deleteComment(id: number, project: number): Observable<any> {
        return this.http.delete<number>(`${this.apiServerUrl}/project/${project}/comment/${id}`)
    }

    addMedia(media: any, type: any, title: any, project: number): Observable<any> {
        return this.http.post<number>(`${this.apiServerUrl}/project/${project}/gallery`, {
            title, type, media
        }, httpOptions)
    }

    enableProject(id: number): Observable<any> {
        return this.http.put(`${this.apiServerUrl}/projects/${id}/enable`, {
            id
        });
    }

    disableProject(id: number): Observable<any> {
        return this.http.put(`${this.apiServerUrl}/projects/${id}/disable`, {
            id
        });
    }
}