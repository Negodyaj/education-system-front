import { Answer } from "./Answer";

export interface Homework{
    Id:number;
    Themes:string[];
    Message?:string;
    IsAnswerRequired?:boolean;
    Answers?: Answer[];
}