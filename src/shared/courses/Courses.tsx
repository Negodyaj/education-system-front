export interface Course {
  id: number;
  name: string;
  theme?: string[];
}

export let courses: Course[] = [ 
  {
      id: 1,
      name: 'C# base',
      theme: ['Array', 'Переменные', 'Типы данных']
  },
  {
      id: 2,
      name: 'Backend',
      theme: ['UnitTest', 'Cycles', 'Делигаты']

  },
  {
      id: 3,
      name: 'Frontend',
      theme: ['React', 'Css', 'Redux']

  },
  {
      id: 4,
      name: 'Mobile development',
      theme: ['Kotlin', 'Swift', 'Xamarin']
  }
];