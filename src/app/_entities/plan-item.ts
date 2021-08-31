import { Project } from "./project";

export interface PlanItem {
    id: number,
    title: string,
    description: string,
    date: string,
    budget: string,
    timelinePosition: string,
    progressPercent: string,
    project: Project,
}