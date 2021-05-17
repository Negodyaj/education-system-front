import { Homework } from '../../../interfaces/Homework';

export const INIT_HOMEWORK: Homework = {
  deadlineDate: '',
  groupsIds: [-1],
  homeworkAttempts: [],
  id: -10,
  isOptional: false,
  name: '',
  startDate: '',
  tags: [],
  themes: [],
  description: '',
  course: {
    description: '',
    duration: 0,
    id: -1,
    isDeleted: true,
    materials: [],
    name: '',
    themes: [],
  },
};
