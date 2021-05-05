export interface LessonInput {
    idGroup: number;
    description: string;
    lessonDate: string;
    idThemes?: number[];
    recordLink?: string;
}