import { Answer } from "./Answer";

export interface Homework{
    Id:number;
    Themes:string[];
    Answers: Answer[];
}