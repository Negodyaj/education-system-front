import { Attempt } from '../../interfaces/Attempt';
import { Homework } from '../../interfaces/Homework';
import { IndexedObj } from '../../interfaces/IndexedObj';
import { getCurrentUserFromStorage } from '../../services/auth.service';
import { INIT_HOMEWORK } from '../tmp-mock-data/hw/initHomewwork';

export const convertHomeworkListToAppointedForStudent = (
  actionPayload: Homework[]
): IndexedObj<Homework[]> => {
  const currentUser = getCurrentUserFromStorage();
  const availableGroups = currentUser.groupIds;
  const previousCourseName: string[] | undefined = [];
  const result: IndexedObj<Homework[]> = {};
  actionPayload.map((hw) => {
    if (
      hw.groupsIds?.length &&
      [...hw.groupsIds].filter((gId) => availableGroups.includes(gId)).length &&
      hw.homeworkAttempts?.filter(
        (attempt) => attempt.author.id === currentUser.id
      ).length === 0
    ) {
      const index = `${hw.course.name}`;

      if (previousCourseName.includes(index)) {
        result[index].push(hw);
      } else if (result[index] === undefined) {
        result[index] = [...[INIT_HOMEWORK]];
        result[index][0] = hw;
      } else result[index].push(hw);

      return previousCourseName.push(index);
    }

    return undefined;
  });

  return result;
};
