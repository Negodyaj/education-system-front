import { GroupStatuses } from "../../../enums/groupStatuses";
import { Homework } from "../../../interfaces/Homework";

export const homeworkList: Homework[] = [{
    id: 3,
    description: "Паттерн декоратор",
    startDate: "29.04.2021",
    deadlineDate: "01.05.2021",
    isOptional: false,
    group: {
        id: 14,
        startDate: "09.04.2021",
        course: {
            id: 4,
            name: "Frontend",
            description: "",
            duration: 0,
            themes: [],
            materials: []
        },
        groupStatus: GroupStatuses[GroupStatuses.Colloquium],
        groupStatusId: GroupStatuses.Colloquium
    },
    tags: [],
    homeworkAttempts: [],
    themes: []
}]