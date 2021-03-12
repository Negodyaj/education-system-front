export abstract class FilterParameter{
    abstract FilterType:string;
    Content: string[]

    constructor(content:string[]){
        this.Content=content;
    }
}