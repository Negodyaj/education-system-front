import { InputNames } from '../../enums/inputNames';

import { FormElementSettings } from './userFormRegisterSettingByKey';

export const getTagAddForm = (key: InputNames): FormElementSettings => {
  switch (key) {
    case InputNames.Tag:
      return {
        label: '',
        inputSettings: {
          name: key,
          inputType: 'text',
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
