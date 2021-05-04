import { GroupStatuses } from "../../../enums/groupStatuses";
import { Homework } from "../../../interfaces/Homework";

export const homeworkList: Homework[] = [
    {
        id: 3,
        name: "Переделать созданные компоненты на redux/thunk",
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
                tags: []
            }
        ]
    },
    {
        id: 4,
        name: "Рендеринг списков в React",
        startDate: "27.04.2021",
        deadlineDate: "29.05.2021",
        isOptional: false,
        group: {
            id: 1,
            startDate: "09.07.2021",
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
                tags: []
            }
        ]
    },
    {
        id: 5,
        name: "Релизовать паттерн состояние",
        startDate: "27.04.2021",
        deadlineDate: "29.05.2021",
        isOptional: false,
        group: {
            id: 13,
            startDate: "09.01.2021",
            course: {
                id: 114,
                name: "C# base",
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
                id: 10,
                name: "Паттерны. Состояние.",
                tags: []
            },
            {
                isDeleted: false,
                id: 11,
                name: "ООП",
                tags: []
            }
        ]
    },
    {
        id: 55,
        name: "Event loop. Асинхронность в браузере.",
        description: "Это спросят на собеседовании!!! https://developer.mozilla.org/ru/docs/Web/JavaScript/EventLoop",
        startDate: "27.04.2021",
        deadlineDate: "29.05.2021",
        isOptional: true,
        group: {
            id: 1,
            startDate: "09.07.2021",
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
                id: 10,
                name: "Паттерны. Состояние.",
                tags: []
            },
            {
                isDeleted: false,
                id: 11,
                name: "ООП",
                tags: []
            }
        ]
    }
]