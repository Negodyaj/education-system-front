import { InputNames } from '../../enums/inputNames';

import {
  baseSettings,
  FormElementSettings,
} from './userFormRegisterSettingByKey';

export const getPaymentFormElementSettings = (
  key: InputNames
): FormElementSettings => {
  switch (key) {
    case InputNames.PaymentAmount:
      return {
        ...baseSettings,
        label: key,
        inputSettings: {
          name: 'Сумма платежа',
          inputType: 'number',
        },
        width: 450,
      };
    case InputNames.PaymentContract:
      return {
        ...baseSettings,
        label: key,
        inputSettings: {
          name: 'Номер договора',
          inputType: 'text',
          registerOptions: {
            required: 'Введите cумму оплаты',
          },
        },
        width: 450,
      };
    case InputNames.PaymentDate:
      return {
        ...baseSettings,
        label: key,
        inputSettings: {
          name: 'Дата платежа',
          inputType: 'date',
          registerOptions: {
            required: 'Введите дату платежа',
          },
        },
        width: 450,
      };
    case InputNames.PaymentPeriod:
      return {
        ...baseSettings,
        label: key,
        inputSettings: {
          name: 'Продолжительность курса',
          inputType: 'date',
          registerOptions: {
            required: 'Введите продолжительность курса',
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
