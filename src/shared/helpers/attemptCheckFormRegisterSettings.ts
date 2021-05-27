import { HWAttemptStatuses } from '../../enums/hwAttemptStatuses';
import { InputNames } from '../../enums/inputNames';
import {
  convertEnumToDictionary,
  getRussianDictionary,
} from '../converters/enumToDictionaryEntity';

import { FormElementSettings } from './userFormRegisterSettingByKey';

export const getAttemptCheckFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.HomeworkAttemptStatusId:
      return {
        label: '',
        width: 150,
        inputSettings: {
          name: key,
          inputType: 'singleSelect',
          selectOptions: getRussianDictionary(
            convertEnumToDictionary(HWAttemptStatuses)
          ),
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
