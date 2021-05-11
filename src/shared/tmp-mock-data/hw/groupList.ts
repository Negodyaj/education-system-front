import { GroupStatuses } from '../../../enums/groupStatuses';
import { DictionaryEntity } from '../../../interfaces/DictionaryEntity';
import { Group } from '../../../interfaces/Group';

export const groupList: Group[] = [
  {
    id: 1,
    startDate: '09.04.2021',
    groupStatusId: GroupStatuses.Studying,
    groupStatus: GroupStatuses[GroupStatuses.Studying],
    students: [],
    teachers: [],
    tutors: [],
    course: {
      id: 1,
      name: 'C# base',
      description: '',
      duration: 4,
      isDeleted: false,
      materials: [],
      themes: [],
    },
  },
  {
    id: 2,
    startDate: '06.04.2021',
    students: [],
    teachers: [],
    tutors: [],
    groupStatusId: GroupStatuses.Studying,
    groupStatus: GroupStatuses[GroupStatuses.Studying],
    course: {
      id: 2,
      name: 'Frontend',
      description: '',
      duration: 4,
      isDeleted: false,
      materials: [],
      themes: [],
    },
  },
  {
    id: 3,
    startDate: '08.04.2021',
    students: [],
    teachers: [],
    tutors: [],
    groupStatusId: GroupStatuses.Studying,
    groupStatus: GroupStatuses[GroupStatuses.Studying],
    course: {
      id: 3,
      name: 'Java base',
      description: '',
      duration: 4,
      isDeleted: false,
      materials: [],
      themes: [],
    },
  },
];

export const groupEntities: DictionaryEntity[] = [];
