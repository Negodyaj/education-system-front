export interface Themes {
    id: number;
    name: string;
    check: boolean
}

export let themes: Themes[] = [ 
    {
        id: 1,
        name: 'Массивы',
        check: false
    },
    {
        id: 2,
        name: 'Переменные',
        check: false
    },
    {
        id: 3,
        name: 'Типы данных',
        check: false
    },
    {
        id: 4,
        name: 'Циклы',
        check: false
    },
    {
        id: 5,
        name: 'Делегаты',
        check: false
    },
    {
        id: 6,
        name: 'Тесты',
        check: false
    }
];