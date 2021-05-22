import { InputNames } from '../../enums/inputNames';

import {
  baseSettings,
  FormElementSettings,
} from './userFormRegisterSettingByKey';

export const getCourseFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.CourseName:
      return {
        ...baseSettings,
        label: 'Название курса',
        inputSettings: {
          name: key,
          inputType: 'text',
        },
        width: 450,
      };
    case InputNames.CourseDescription:
      return {
        ...baseSettings,
        label: 'Описание курса',
        inputSettings: {
          name: key,
          inputType: 'textarea',
          registerOptions: {
            required: 'Введите описание курса',
            min: {
              value: 2,
              message: 'Минимальное колличество символов 2',
            },
          },
        },
        width: 450,
      };
    case InputNames.CourseDuration:
      return {
        ...baseSettings,
        label: 'Продолжительность курса',
        inputSettings: {
          name: key,
          inputType: 'number',
          registerOptions: {
            required: 'Введите продолжительность курса',
          },
        },
        width: 100,
      };
    default:
      return {
        ...baseSettings,
        label: key,
        inputSettings: {
          name: key,
          inputType: 'text',
        },
      };
  }
};
