import { InputNames } from '../../enums/inputNames';

import { useCoursesForHomeworkAddModal } from './entitiesGetters';
import { FormElementSettings } from './userFormRegisterSettingByKey';

export const cloneHomeworkForm = (key: InputNames): FormElementSettings => {
  switch (key) {
    case InputNames.HomeworkCourseId:
      return {
        label: 'для курса:',
        inputSettings: {
          name: key,
          inputType: 'singleSelect',
          selectOptions: useCoursesForHomeworkAddModal,
        },
      };
    default:
      return {
        label: key,
        inputSettings: {
          name: key,
          inputType: 'text',
        },
      };
  }
};
