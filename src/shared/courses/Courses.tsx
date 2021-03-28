export interface Course {
  id: number;
  name: string;
  themes?: string[];
}

export let courses: Course[] = [ 
  {
      id: 1,
      name: 'C# base',
      themes: ['Массивы', 'Переменные', 'Типы данных']
  },
  {
      id: 2,
      name: 'Backend',
      themes: ['UnitTest', 'Cycles', 'Делигаты']

  },
  {
      id: 3,
      name: 'Frontend',
      themes: ['React', 'Css', 'Redux']

  },
  {
      id: 4,
      name: 'Mobile development',
      themes: ['Kotlin', 'Swift', 'Xamarin']
  }
];