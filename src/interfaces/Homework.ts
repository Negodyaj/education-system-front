import { Answer } from "./Answer";

export interface Homework{
    id:number;
    themes:string[];
    message?:string;
    isAnswerRequired?:boolean;
    answers?: Answer[];
}