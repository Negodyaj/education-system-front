import { RegisterOptions } from 'react-hook-form';

import { InputNames } from '../../enums/inputNames';
import { Role } from '../../enums/role';
import { DictionaryEntity } from '../../interfaces/DictionaryEntity';
import {
  convertEnumToDictionary,
  getRussianDictionary,
} from '../converters/enumToDictionaryEntity';
import { getUserValidationPattern } from '../validation-rules/userValidationPatterns';

import { EntitiesGetter } from './entitiesGetters';
export interface BaseInputSettings {
  name: string;
  registerOptions?: RegisterOptions;
}
export interface InternalInputSettings extends BaseInputSettings {
  inputType: 'text' | 'date' | 'picture' | 'textarea' | 'number';
}
export interface ExternalInputSettings extends BaseInputSettings {
  inputType: 'singleSelect' | 'multiSelect';
  selectOptions: DictionaryEntity[] | EntitiesGetter;
}
export type InputSettings = InternalInputSettings | ExternalInputSettings;
export interface FormElementSettings {
  label: string;
  inputSettings: InputSettings;
}
export const getUserFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.Id:
      return {
        label: 'Id',
        inputSettings: {
          name: key,
          inputType: 'text',
        },
      };
    case InputNames.FirstName:
      return {
        label: 'Имя',
        inputSettings: {
          name: key,
          inputType: 'text',
          registerOptions: {
            required: 'Введите имя',
            pattern: getUserValidationPattern(key),
          },
        },
      };
    case InputNames.LastName:
      return {
        label: 'Фамилия',
        inputSettings: {
          name: key,
          inputType: 'text',
          registerOptions: {
            required: 'Введите фамилию',
            pattern: getUserValidationPattern(key),
          },
        },
      };
    case InputNames.Login:
      return {
        label: 'Логин',
        inputSettings: {
          name: key,
          inputType: 'text',
          registerOptions: {
            required: 'Введите логин',
            pattern: getUserValidationPattern(key),
          },
        },
      };
    case InputNames.Password:
      return {
        label: 'Пароль',
        inputSettings: {
          name: key,
          inputType: 'text',
          registerOptions: {
            required: 'Введите пароль',
            pattern: getUserValidationPattern(key),
          },
        },
      };
    case InputNames.UserPic:
      return {
        label: 'Аватар',
        inputSettings: {
          name: key,
          inputType: 'picture',
          registerOptions: {
            required: 'Вставьте ссылку на изображение',
            pattern: getUserValidationPattern(key),
          },
        },
      };
    case InputNames.Phone:
      return {
        label: 'Телефон',
        inputSettings: {
          name: key,
          inputType: 'text',
          registerOptions: {
            required: 'Введите номер телефона',
            pattern: getUserValidationPattern(key),
          },
        },
      };
    case InputNames.BirthDate:
      return {
        label: 'Дата рождения',
        inputSettings: {
          inputType: 'date',
          name: key,
        },
      };
    case InputNames.Roles:
      return {
        label: 'Роли',
        inputSettings: {
          inputType: 'multiSelect',
          selectOptions: getRussianDictionary(convertEnumToDictionary(Role)),
          name: key,
        },
      };
    case InputNames.ContractNumber:
      return {
        label: 'номер договора',
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
