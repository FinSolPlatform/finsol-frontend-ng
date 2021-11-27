import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
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
    isPlanAddSucceded: boolean = false;
    isPlanEditSucceded: boolean = false;
    isMediaUpdateSucceded: boolean = false;
    loggedUser: string;
    user: User;
    isLoggedIn: any;
    isOwner = false;
    successMessage = '';
    errorMessage = '';
    editPlanId: number = null;
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
    planForm: any = {
        title: null,
        description: null,
        date: null,
        budget: null,
        timelinePosition: null,
        progressPercent: null,
    }
    editPlanForm: any = {
        title: null,
        description: null,
        date: null,
        budget: null,
        timelinePosition: null,
        progressPercent: null,
    }
    mediaForm: any = {
        type: null,
        url: null,
        title: null,
    }
    types = [
        { id: 'image', value: 'Photo' },
        { id: 'video', value: 'Vidèo' },
    ];

    // constructor
    constructor(
        private projectService: ProjectService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private tokenStorageService: TokenStorageService,
        private router: Router,
        private readonly keycloak: KeycloakService,
        private titleService: Title
    ) {

        // get logged user name
        this.isLogged();
        console.log(this.isLoggedIn)

        // get project by id
        this.activatedRoute.queryParams.subscribe(params => { this.display = params['show']; });
        this.getProject(parseInt(activatedRoute.snapshot.url[1].path));
    }

    async isLogged() {
        this.isLoggedIn = await this.keycloak.getUsername();

        if (this.isLoggedIn) {
            console.log(this.isLoggedIn)
            this.isLoggedIn = true;

            this.userService.getUserByUsername(this.keycloak.getUsername()).subscribe(
                response => {
                    this.loggedUser = response.username;
                    this.user = response;
                },
                err => {
                    this.errorMessage = err.error.message;
                }
            )
        } else {
            this.isLoggedIn = false;
        }
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.titleService.setTitle(data.title);
        })
    }

    public getProject(id: number): void {
        this.projectService.getProjectById(id).subscribe(
            (response: Project) => {
                // console.log(response);
                this.project = response;
                for (let index = 0; index < response.comment.length; index++) {
                    this.userService.getUserByUsername(response.comment[index].username).subscribe(
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
                // check user is admin of project
                if (this.project.owner.toLowerCase() == this.loggedUser ||
                    this.loggedUser == 'admin') {
                    this.isOwner = true;
                }
                // project edit form 
                this.projectForm['name'] = this.project.name;
                // console.log(this.project.budget)
                this.projectForm['budget'] = this.project.budget;
                this.projectForm['description'] = this.project.description;
                this.projectForm['location'] = this.project.location;
                this.coverForm['cover'] = this.project.photo;
                // get sorted plan
                this.getPlan(this.project.id);
            },
            (error: HttpErrorResponse) => {
                // this.router.navigate(["not-found"])
            }
        )
    }

    public getPlan(id: number): void {
        this.projectService.getProjectPlan(id).subscribe(
            (response: PlanItem[]) => {
                this.project.plan = response;
                // console.log(response)
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    public onSubmitAddPlan(): void {
        const { title, description, date, budget, timelinePosition, progressPercent } = this.planForm;

        this.projectService.addPlan(title, description, date, budget, timelinePosition, progressPercent, this.project.id).subscribe(
            async response => {
                this.isPlanAddSucceded = true;
                await this.delay(1500);
                this.reloadPage();
            },
            err => {
                this.isPlanAddSucceded = false;
            }
        )
    }

    public setEditPlanId(id: number) {
        this.editPlanId = id;
        let plan: PlanItem = this.project.plan.find(i => i.id == this.editPlanId)

        this.editPlanForm['title'] = plan.title;
        this.editPlanForm['description'] = plan.description;
        this.editPlanForm['date'] = plan.date;
        this.editPlanForm['budget'] = plan.budget;
        this.editPlanForm['timelinePosition'] = plan.timelinePosition;
        this.editPlanForm['progressPercent'] = plan.progressPercent;
    }

    public editPlan(id: number): void {
        const { title, description, date, budget, timelinePosition, progressPercent } = this.editPlanForm;
        this.projectService.updatePlan(title, description, date, budget, timelinePosition, progressPercent, this.editPlanId, this.project.id).subscribe(
            async response => {
                this.isPlanEditSucceded = true;
                await this.delay(1500);
                this.successMessage = response.message;
                this.reloadPage();
            },
            err => {
                this.isPlanEditSucceded = false;
            }
        )
    }

    public deletePlan(id: number): void {
        this.projectService.deletePlan(id, this.project.id).subscribe(
            async (response: PlanItem[]) => {
                // console.log(response)
                await this.delay(1500);
                this.reloadPage();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    public onSubmitMedia(): void {
        const { url, type, title } = this.mediaForm;
        this.projectService.addMedia(url, type, title, this.project.id).subscribe(
            async response => {
                this.isMediaUpdateSucceded = true;
                if (type == "image")
                    this.successMessage = `Image est ajoutée avec succès`;
                else
                    this.successMessage = `Vidèo est ajouté avec succès`;
                await this.delay(1500);
                this.reloadPage();
            },
            err => {
                this.isMediaUpdateSucceded = false;
            }
        )
    }

    public onSubmitComment(): void {
        const { message } = this.commentForm;
        if (this.isLogged) {
            this.projectService.addComment(this.project.id, message, this.loggedUser, "0", this.project).subscribe(
                response => {
                    console.log(response)
                    this.reloadPage();
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
        }
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

    public deleteComment(id: number): void {
        this.projectService.deleteComment(id, this.project.id).subscribe(
            async (response: PlanItem[]) => {
                // console.log(response)
                await this.delay(1500);
                this.reloadPage();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
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
