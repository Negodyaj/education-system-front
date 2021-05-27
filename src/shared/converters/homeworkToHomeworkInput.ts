import { Homework } from '../../interfaces/Homework';
import { HomeworkInput } from '../../interfaces/HomeworkInput';

export const initHomeworkInput: HomeworkInput = {
  description: '',
  isOptional: false,
  courseId: 0,
  tags: [],
  themeIds: [],
};
export const homeworkToHomeworkInput = (
  actionPayload: Homework
): HomeworkInput => ({
  description: actionPayload.description || '',
  isOptional: actionPayload.isOptional,
  courseId: actionPayload.course.id,
  tags: actionPayload.tags,
  themeIds: actionPayload.themes?.map((item) => item.id) || [],
});
