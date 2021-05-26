import { InputNames } from '../../enums/inputNames';
import { convertStringToDate } from '../converters/stringToDateConverter';

import { useGetGroupEntities } from './entitiesGetters';
import { FormElementSettings } from './userFormRegisterSettingByKey';

export const getAppointFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.AppointGroup:
      return {
        label: '',
        inputSettings: {
          name: key,
          inputType: 'singleSelect',
          selectOptions: useGetGroupEntities,
        },
      };
    case InputNames.AppointStartDate:
      return {
        label: 'дата назначения',
        inputSettings: {
          name: key,
          inputType: 'date',
        },
      };
    case InputNames.AppointDeadline:
      return {
        label: 'дедлайн',
        inputSettings: {
          name: key,
          inputType: 'date',
          registerOptions: {
            validate: (value) =>
              convertStringToDate(value) > new Date()
                ? true
                : `Введите дату после ${new Date().toLocaleDateString()}`,
          },
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
