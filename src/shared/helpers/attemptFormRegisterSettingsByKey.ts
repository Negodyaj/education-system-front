import { InputNames } from '../../enums/inputNames';

import { FormElementSettings } from './userFormRegisterSettingByKey';

const getAttemptFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.AttemptComment:
      return {
        label: 'Текст ответа:',
        width: 750,
        inputSettings: {
          name: key,
          inputType: 'textarea',
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

export default getAttemptFormElementSettings;
