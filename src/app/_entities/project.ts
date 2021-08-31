import { Gallery } from "./gallery";
import { PlanItem } from "./plan-item";
import { Comment } from "./comment";

export interface Project {
    id: number,
    name: string,
    description: string,
    creationDate: string,
    location: string,
    owner: string,
    status: string,
    photo: string,
    budget: string,
    progression: string,
    volunteers: string,
    plan: PlanItem[],
    media: Gallery[],
    comment: Comment[],
}