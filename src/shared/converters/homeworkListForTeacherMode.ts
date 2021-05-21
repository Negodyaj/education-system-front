import { Homework } from '../../interfaces/Homework';
import { IndexedObj } from '../../interfaces/IndexedObj';
import { INIT_HOMEWORK } from '../tmp-mock-data/hw/initHomewwork';

export const convertHomeworkListForTeacherMode = (
  actionPayload: Homework[]
): IndexedObj<Homework[]> => {
  const previousGroupIds: number[] | undefined = [];
  const result: IndexedObj<Homework[]> = {};
  const groupIndex = 0;
  const currentGroupId = 0;

  return result;
};
