import { GroupStatuses } from "../../../enums/groupStatuses";
import { Homework } from "../../../interfaces/Homework";

export const homeworkList: Homework[] = [
    {
        id: 3,
        description: "Переделать созданные компоненты на redux/thunk",
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
        themes: [
            {
                isDeleted: false,
                id: 9,
                name: "redux",
                tags:[]
            }
        ]
    },
    {
        id: 4,
        description: "Рендеринг списков в React",
        startDate: "27.04.2021",
        deadlineDate: "29.05.2021",
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
        themes: [
            {
                isDeleted: false,
                id: 1,
                name: "циклы",
                tags:[]
            }
        ]
    }
]