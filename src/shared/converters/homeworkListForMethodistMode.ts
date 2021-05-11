import { Homework } from '../../interfaces/Homework';
import { IndexedObj } from '../../interfaces/IndexedObj';
import { INIT_HOMEWORK } from '../tmp-mock-data/hw/initHomewwork';

export const convertHomeworkListForMethodistMode = (
  actionPayload: Homework[]
): IndexedObj<Homework> => {
  const previousCourseName: string[] | undefined = [];
  const result: IndexedObj<Homework> = {};
  actionPayload.map((hw) => {
    if (previousCourseName.includes(hw.group.course.name)) {
      result[hw.group.course.name].push(hw);
    } else if (result[hw.group.course.name] === undefined) {
      result[hw.group.course.name] = [...[INIT_HOMEWORK]];
      result[hw.group.course.name][0] = hw;
    } else result[hw.group.course.name].push(hw);

    return previousCourseName?.push(hw.group.course.name);
  });

  return result;
};
