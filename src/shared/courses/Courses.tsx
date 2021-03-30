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
      themes: [
        {
          id: 1,
          name: 'C# base',
          check: false
        }
      ]
  },
  {
      id: 2,
      name: 'Backend',
      themes: [
        {
          id: 1,
          name: 'Backend',
          check: false
        }
      ]
  },
  {
      id: 3,
      name: 'Frontend',
      themes: [
        {
          id: 1,
          name: 'Frontend',
          check: false
        }
      ]
  },
  {
      id: 4,
      name: 'Mobile development',
      themes: [
        {
          id: 1,
          name: 'Mobile development',
          check: false
        }
      ]
  }
];