import { ChildIndex } from '../../../../../enums/ChildIndex';
import { InputNames } from '../../../../../enums/inputNames';
import { getAppointFormElementSettings } from '../../../../helpers/appointFormRegisterSettingsByKey';
import { getCourseFormElementSettings } from '../../../../helpers/courseFormRegisterSettingByKey';
import { getHomeworkAddForm } from '../../../../helpers/addHomeworkForm';

export const selectFormSetting = (index: ChildIndex, key: InputNames) => {
  switch (index) {
    case ChildIndex.NewCourse:
      return getCourseFormElementSettings(key);
    case ChildIndex.AppointHomework:
      return getAppointFormElementSettings(key);
    case ChildIndex.AddHomework:
      return getHomeworkAddForm(key);
  }

  return undefined;
};
