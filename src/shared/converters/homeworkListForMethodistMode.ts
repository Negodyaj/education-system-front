import { Homework } from '../../interfaces/Homework';
import { IndexedObj } from '../../interfaces/IndexedObj';
import { INIT_HOMEWORK } from '../tmp-mock-data/hw/initHomewwork';

export const convertHomeworkListForMethodistMode = (
  actionPayload: Homework[]
): IndexedObj<Homework[]> => {
  const previousCourseName: string[] | undefined = [];
  const result: IndexedObj<Homework[]> = {};
  actionPayload.map((hw) => {
    if (!hw.groupsIds?.length) {
      if (previousCourseName.includes(hw.course.name)) {
        result[hw.course.name].push(hw);
      } else if (result[hw.course.name] === undefined) {
        result[hw.course.name] = [...[INIT_HOMEWORK]];
        result[hw.course.name][0] = hw;
      } else result[hw.course.name].push(hw);

      return previousCourseName.push(hw.course.name);
    }

    return undefined;
  });

  return result;
};
