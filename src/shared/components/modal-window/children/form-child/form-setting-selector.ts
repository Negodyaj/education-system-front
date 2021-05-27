import { ChildIndex } from '../../../../../enums/ChildIndex';
import { InputNames } from '../../../../../enums/inputNames';
import { getAppointFormElementSettings } from '../../../../helpers/appointFormRegisterSettingsByKey';
import { getCourseFormElementSettings } from '../../../../helpers/courseFormRegisterSettingByKey';
import {
  getLessonFormElementSettings,
  getLessonUpdateFormElementSettings,
} from '../../../../helpers/lessonFormRegisterSettingByKey';
import { getMaterialFormElementSettings } from '../../../../helpers/materialFormRegisterSettingByKey';
import { getPaymentFormElementSettings } from '../../../../helpers/paymentFormRegisterSettingByKey';
import { getHomeworkAddForm } from '../../../../helpers/addHomeworkForm';
import { getThemeFormElementSettings } from '../../../../helpers/themeFormRegisterSettingByKey';

export const selectFormSetting = (index: ChildIndex, key: InputNames) => {
  switch (index) {
    case ChildIndex.NewCourse:
      return getCourseFormElementSettings(key);
    case ChildIndex.Payment:
      return getPaymentFormElementSettings(key);
    case ChildIndex.AppointHomework:
      return getAppointFormElementSettings(key);
    case ChildIndex.AddHomework:
      return getHomeworkAddForm(key);
    case ChildIndex.NewLesson:
      return getLessonFormElementSettings(key);
    case ChildIndex.UpdateLesson:
      return getLessonUpdateFormElementSettings(key);
    case ChildIndex.NewTheme:
      return getThemeFormElementSettings(key);
    case ChildIndex.NewMaterial:
      return getMaterialFormElementSettings(key);
  }

  return undefined;
};
