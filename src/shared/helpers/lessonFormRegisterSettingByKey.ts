import { InputNames } from '../../enums/inputNames';

import { useGetThemesEntities } from './entitiesGetters';
import {
  baseSettings,
  FormElementSettings,
} from './userFormRegisterSettingByKey';

export const getLessonFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.LessonDescription:
      return {
        ...baseSettings,
        label: 'Описание занятия',
        inputSettings: {
          name: key,
          inputType: 'textarea',
          registerOptions: {
            required: 'Введите описание занятия',
            min: {
              value: 2,
              message: 'Минимальное колличество символов 2',
            },
          },
        },
        width: 450,
      };
    case InputNames.LessonDate:
      return {
        ...baseSettings,
        label: 'Дата занятия',
        inputSettings: {
          name: key,
          inputType: 'date',
          registerOptions: {
            required: 'Введите дату занятия',
          },
        },
        width: 450,
      };
    case InputNames.LessonThemesId:
      return {
        ...baseSettings,
        label: 'Темы занятия',
        inputSettings: {
          name: key,
          inputType: 'multiSelect',
          selectOptions: useGetThemesEntities,
          registerOptions: {
            required: 'Выберите темы занятия',
          },
        },
        width: 450,
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

export const getLessonUpdateFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.LessonDescription:
      return {
        ...baseSettings,
        label: 'Описание занятия',
        inputSettings: {
          name: key,
          inputType: 'textarea',
          registerOptions: {
            required: 'Введите описание занятия',
            minLength: {
              value: 2,
              message: 'Минимальное колличество символов 2',
            },
          },
        },
        width: 450,
      };
    case InputNames.LessonDate:
      return {
        ...baseSettings,
        label: 'Дата занятия',
        inputSettings: {
          name: key,
          inputType: 'date',
          registerOptions: {
            required: 'Введите дату занятия',
          },
        },
        width: 450,
      };
    case InputNames.LessonThemesId:
      return {
        ...baseSettings,
        label: 'Темы занятия',
        inputSettings: {
          name: key,
          inputType: 'multiSelect',
          selectOptions: useGetThemesEntities,
          registerOptions: {
            required: 'Выберите темы занятия',
          },
        },
        width: 450,
      };
    case InputNames.LessonRecordLink:
      return {
        ...baseSettings,
        label: 'Ссылка на запись занятия',
        inputSettings: {
          name: key,
          inputType: 'text',
          registerOptions: {
            required: 'Укажите ссылку на запись занятия',
          },
        },
        width: 450,
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
