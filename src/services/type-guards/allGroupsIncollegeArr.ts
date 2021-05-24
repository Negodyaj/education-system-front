import { AllGroupsInCollege } from '../../interfaces/AllGroupsInCollege';

export const isAllGroupsInCollegeArr = (
  data: any
): data is AllGroupsInCollege[] => {
  if (data)
    return (
      Array.isArray(data) &&
      !!data[0].id &&
      !!data[0].startDate &&
      !!data[0].course &&
      !!data[0].groupStatus
    );

  return false;
};
