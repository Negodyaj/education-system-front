import { ChildIndex } from '../../../../../enums/ChildIndex';
import { InputNames } from '../../../../../enums/inputNames';
import { getAppointFormElementSettings } from '../../../../helpers/appointFormRegisterSettingsByKey';
import { getCourseFormElementSettings } from '../../../../helpers/courseFormRegisterSettingByKey';
import { getPaymentFormElementSettings } from '../../../../helpers/paymentFormRegisterSettingByKey';

export const selectFormSetting = (index: ChildIndex, key: InputNames) => {
  switch (index) {
    case ChildIndex.NewCourse:
      return getCourseFormElementSettings(key);
    case ChildIndex.Payment:
      return getPaymentFormElementSettings(key);
    case ChildIndex.AppointHomework:
      return getAppointFormElementSettings(key);
  }

  return undefined;
};
