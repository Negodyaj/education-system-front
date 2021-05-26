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
        label: 'Сумма платежа',
        inputSettings: {
          name: key,
          inputType: 'number',
        },
        width: 450,
      };
    case InputNames.PaymentContract:
      return {
        ...baseSettings,
        label: 'Номер договора',
        inputSettings: {
          name: key,
          inputType: 'number',
          registerOptions: {
            required: 'Введите cумму оплаты',
          },
        },
        width: 450,
      };
    case InputNames.PaymentDate:
      return {
        ...baseSettings,
        label: 'Дата платежа',
        inputSettings: {
          name: key,
          inputType: 'date',
          registerOptions: {
            required: 'Введите дату платежа',
          },
        },
      };
    case InputNames.PaymentPeriod:
      return {
        ...baseSettings,
        label: 'Период платежа',
        inputSettings: {
          name: key,
          inputType: 'date',
          registerOptions: {
            required: 'Введите за какой срок вносили платеж',
          },
        },
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
