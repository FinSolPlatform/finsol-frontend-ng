import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Gallery } from "../_entities/gallery";
import { PlanItem } from "../_entities/plan-item";
import { Project } from "../_entities/project";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    private apiServerUrl = environment.projectApiBaseUrl;

    constructor(private http: HttpClient) { }

    getProjectByName(keyword: string, page: number, size: number): Observable<any> {
        return this.http.post<Project[]>(`${this.apiServerUrl}/api/projects/search/${page}/${size}`, { keyword }, httpOptions)
    }

    getLatestProjects(): Observable<any> {
        return this.http.get<Project[]>(`${this.apiServerUrl}/api/projects`)
    }

    getProjectById(id: number): Observable<any> {
        return this.http.get<Project[]>(`${this.apiServerUrl}/api/projects/${id}`)
    }

    getProjectPlan(id: number): Observable<any> {
        return this.http.get<PlanItem[]>(`${this.apiServerUrl}/api/project/${id}/plan`)
    }

    addComment(id: number, message: string, username: string, replyTo: string, project: Project): Observable<any> {
        return this.http.post(`${this.apiServerUrl}/api/project/${id}/comment`, {
            message,
            username,
            replyTo,
            project
        }, httpOptions)
    }

    getSeachResultProjectsNumber(keyword: string): Observable<any> {
        return this.http.post<number>(`${this.apiServerUrl}/api/projects/search`, { keyword }, httpOptions)
    }

    addProject(
        name: string, description: string, location: string, owner: string, photo: string, budget: string): Observable<any> {
        return this.http.post<number>(`${this.apiServerUrl}/api/projects`, {
            name,
            description,
            location,
            owner,
            photo,
            budget,
        }, httpOptions)
    }

    updateProject(project: Project): Observable<any> {
        return this.http.put<number>(`${this.apiServerUrl}/api/projects/${project.id}`, {
            budget: project.budget,
            description: project.description,
            location: project.location,
            name: project.name
        }, httpOptions)
    }

    updateCover(photo: string, id: number): Observable<any> {
        return this.http.put(`${this.apiServerUrl}/api/projects/${id}/photo`, { photo }, httpOptions)
    }
}