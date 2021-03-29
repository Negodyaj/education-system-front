import { Themes } from "../themes/Themes";

export interface Course {
  id: number;
  name: string;
  themes: Themes[];
}

export let courses: Course[] = [ 
  {
      id: 1,
      name: 'C# base',
      themes: []
  },
  {
      id: 2,
      name: 'Backend',
      themes: []
  },
  {
      id: 3,
      name: 'Frontend',
      themes: []
  },
  {
      id: 4,
      name: 'Mobile development',
      themes: []
  }
];