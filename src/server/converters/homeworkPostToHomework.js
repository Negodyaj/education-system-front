import * as courses from '../mock-data/courses.json';
import * as tags from '../mock-data/tags.json';
import * as themes from '../mock-data/themes.json';
import { newId } from '../server';

const convertHomeworkPostToHomework = (hw) => {
  console.log(hw.themeIds);

  return {
    id: newId.next().value || -1,
    description: hw.description,
    startDate: hw.startDate,
    deadlineDate: hw.deadlineDate,
    isOptional: hw.isOptional,
    course:
      courses.default.filter((course) => course.id === hw.courseId)[0] || [],
    groupsIds: hw.groupId ? [hw.groupId] : [],
    tags: tags.default.filter((tag) => hw.tagIds?.includes(tag.id)),
    themes: themes.default.filter((theme) =>
      hw.themeIds
        ? hw.themeIds?.map((id) => +id).includes(theme.id)
        : hw.themes.includes(theme.id)
    ),
    homeworkAttempts: [],
  };
};

export default convertHomeworkPostToHomework;
