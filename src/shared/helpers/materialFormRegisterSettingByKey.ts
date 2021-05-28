import { InputNames } from '../../enums/inputNames';

import {
  baseSettings,
  FormElementSettings,
} from './userFormRegisterSettingByKey';

export const getMaterialFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.MaterialDescription:
      return {
        ...baseSettings,
        label: 'Описание материала',
        inputSettings: {
          name: key,
          inputType: 'textarea',
          registerOptions: {
            required: 'Введите описание материала',
            minLength: {
              value: 2,
              message: 'Минимальное колличество символов 2',
            },
          },
        },
        width: 450,
      };
    case InputNames.MaterialLink:
      return {
        ...baseSettings,
        label: 'Ссылка на материал',
        inputSettings: {
          name: key,
          inputType: 'text',
          registerOptions: {
            required: 'Укажите ссылку на материал',
            minLength: {
              value: 2,
              message: 'Минимальное колличество символов 2',
            },
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
