import { InputNames } from '../../enums/inputNames';

import { useGetTagsEntities } from './entitiesGetters';
import {
  baseSettings,
  FormElementSettings,
} from './userFormRegisterSettingByKey';

export const getThemeFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.ThemeName:
      return {
        ...baseSettings,
        label: 'Название темы',
        inputSettings: {
          name: key,
          inputType: 'text',
          registerOptions: {
            required: 'Введите название темы',
            min: {
              value: 2,
              message: 'Минимальное колличество символов 2',
            },
          },
        },
        width: 450,
      };
    case InputNames.ThemeTagsId:
      return {
        ...baseSettings,
        label: 'Теги',
        inputSettings: {
          name: key,
          inputType: 'multiSelect',
          selectOptions: useGetTagsEntities,
          registerOptions: {
            required: 'Выберите теги',
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
