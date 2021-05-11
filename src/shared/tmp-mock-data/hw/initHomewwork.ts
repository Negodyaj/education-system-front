import { Homework } from '../../../interfaces/Homework';

export const INIT_HOMEWORK: Homework = {
  deadlineDate: '',
  group: {
    course: {
      id: 0,
      name: '',
      description: '',
      duration: 0,
      materials: [],
      themes: [],
    },
    groupStatus: '',
    groupStatusId: 0,
    id: -1,
    startDate: '',
  },
  homeworkAttempts: [],
  id: -10,
  isOptional: false,
  name: '',
  startDate: '',
  tags: [],
  themes: [],
  description: '',
};
