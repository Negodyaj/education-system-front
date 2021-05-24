import { InputNames } from '../../enums/inputNames';
import { coursesListForModalHW } from '../tmp-mock-data/hw/CourseListForHWModal';

import { useCoursesForHomeworkAddModal } from './entitiesGetters';
import { FormElementSettings } from './userFormRegisterSettingByKey';

export const getHomeworkAddForm = (key: InputNames): FormElementSettings => {
  switch (key) {
    case InputNames.HomeworkDescription:
      return {
        label: 'Описание домашней работы',
        width: 400,
        inputSettings: {
          name: key,
          inputType: 'textarea',
          registerOptions: {
            required: 'Введите описание',
            min: {
              value: 10,
              message: 'Не менее 10 символов',
            },
          },
        },
      };
    case InputNames.HomeworkCourseId:
      return {
        label: 'Курс',
        inputSettings: {
          name: key,
          inputType: 'singleSelect',
          selectOptions: useCoursesForHomeworkAddModal,
        },
      };
    case InputNames.HomeworkIsOptional:
      return {
        label: 'Требует проверки',
        inputSettings: {
          name: key,
          inputType: 'tumbler',
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
