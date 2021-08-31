import { Project } from "./project";

export interface Gallery {
    id: number,
    title: string,
    media: string,
    date: string,
    type: string,
    project: Project,
}