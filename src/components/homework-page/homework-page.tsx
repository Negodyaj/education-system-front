import React, { useState } from "react";
import { CourseFilter } from "../../classes/CourseFilter";
import { FilterParameter } from "../../classes/FilterParameter";
import { GroupFilter } from "../../classes/GroupFilter";
import { ThemeFilter } from "../../classes/ThemeFilter";
import { HomeworkPageModel } from "../../interfaces/HomeworkPageModel";
import Filters from "./Filters/Filters";
import HomeworkRow from "./HomeworkRow/HomeworkRow";
import './homework-page.css';
import DeleteHomeworkModal from './delete-homework-modal/delete-homework-modal';

const model: HomeworkPageModel = {
  Courses: [
    {
      CourseName: "C# Base",
      Groups: [{
        GroupName: "дневная",
        Homeworks: [{
          Id: 0,
          Themes: ["введение в ООП"],
          Answers: []
        }]
      }, {
        GroupName: "вечерняя",
        Homeworks: [{
          Id: 1,
          Themes: ["циклы"],
          Answers: []
        }]
      }]
    }, {
      CourseName: "Java Base",
      Groups: [{
        GroupName: "дневная",
        Homeworks: [{
          Id: 2,
          Themes: ["введение в ООП"],
          Answers: []
        }, {
          Id: 3,
          Themes: ["unit-тесты", "циклы"],
          Answers: []
        }]
      }]
    }, {
      CourseName: "Front-end",
      Groups: [{
        GroupName: "дневная",
        Homeworks: []
      }]
    }, {
      CourseName: "Back-end",
      Groups: [{
        GroupName: "вечерняя",
        Homeworks: []
      }]
    }, {
      CourseName: "Mobile dev",
      Groups: [{
        GroupName: "вечерняя",
        Homeworks: []
      }]
    }]
};

interface HomeworkPageProps {
  roleId: number;
}

function HomeworkPage(props: HomeworkPageProps) {
  const coursesInFilterParameters: string[] = [];
  const groupsInFilterParameters: string[] = [];
  const themesInFilterParameters: string[] = [];

  model.Courses.map(course => {
    coursesInFilterParameters.push(course.CourseName);
    course.Groups.map(group => {
      groupsInFilterParameters.push(course.CourseName + " " + group.GroupName);
      group.Homeworks.map(homework => {
        homework.Themes.map(theme => {
          if (themesInFilterParameters.indexOf(theme) == -1) {
            themesInFilterParameters.push(theme);
          }
        })
      })
    })
  });

  const filterParameters: FilterParameter[] = [
    new CourseFilter(coursesInFilterParameters),
    new GroupFilter(groupsInFilterParameters),
    new ThemeFilter(themesInFilterParameters),
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const deleteHomeworkHandler = (isModalVisible: boolean) => {
    setIsModalVisible(isModalVisible);
  }
  return (
    <div className="container">
      <Filters filterParameters={filterParameters}></Filters>
      {model.Courses.map(course =>
        course.Groups.map(group =>
          group.Homeworks.map(homework =>
          (<HomeworkRow
            Course={course.CourseName}
            Group={group.GroupName}
            Themes={homework.Themes}
            HomeworkObject={homework}
            onDeleteClick={deleteHomeworkHandler}></HomeworkRow>))))
      }
      {isModalVisible && <DeleteHomeworkModal></DeleteHomeworkModal>}
    </div>
  );
}

export default HomeworkPage;
