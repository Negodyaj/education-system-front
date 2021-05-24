import { AllGroupsInCollege } from '../../interfaces/AllGroupsInCollege';
import { SelectItem } from '../../interfaces/SelectItem';

export const convertAllGroupsInCollegeToSelectItems = (
  arg: AllGroupsInCollege[]
): SelectItem[] =>
  arg.map((group) => ({
    label: `${group.course.name} ${group.startDate}`,
    value: group.id,
  }));
