import React, { useState } from "react";
import { CourseFilter } from "../../classes/CourseFilter";
import { FilterParameter } from "../../classes/FilterParameter";
import { GroupFilter } from "../../classes/GroupFilter";
import { ThemeFilter } from "../../classes/ThemeFilter";
import Filters from "./Filters/Filters";
import HomeworkRow from "./HomeworkRow/HomeworkRow";
import DeleteHomeworkModal from './delete-homework-modal/DeleteHomeworkModal';

// const model: HomeworkPageModel = {
//   courses: [
//     {
//       courseName: "C# Base",
//       groups: [{
//         groupName: "дневная",
//         homeworks: [{
//           id: 0,
//           themes: ["введение в ООП"],
//           answers: []
//         }]
//       }, {
//         groupName: "вечерняя",
//         homeworks: [{
//           id: 1,
//           themes: ["циклы"],
//           answers: []
//         }]
//       }]
//     }, {
//       courseName: "Java Base",
//       groups: [{
//         groupName: "дневная",
//         homeworks: [{
//           id: 2,
//           themes: ["введение в ООП"],
//           answers: []
//         }, {
//           id: 3,
//           themes: ["unit-тесты", "циклы"],
//           answers: []
//         }]
//       }]
//     }, {
//       courseName: "Front-end",
//       groups: [{
//         groupName: "дневная",
//         homeworks: [{
//           id: 18,
//           themes: ["Спецификации ES"],
//           answers: []
//         }]
//       }]
//     }, {
//       courseName: "Back-end",
//       groups: [{
//         groupName: "вечерняя",
//         homeworks: [{
//           id: 500,
//           themes: ["ASP.NET Core"],
//           answers: []
//         },
//         {
//           id: 500,
//           themes: [],
//           answers: []
//         }]
//       }]
//     }, {
//       courseName: "Mobile dev",
//       groups: [{
//         groupName: "вечерняя",
//         homeworks: [{
//           id: 50,
//           themes: ["Основы Kotlin"],
//           answers: []
//         }]
//       }]
//     }]
// };

// interface HomeworkPageProps {
//   roleId: number;
// }

function HomeworkPage(/*props: HomeworkPageProps*/) {
  // const coursesInFilterParameters: string[] = [];
  // const groupsInFilterParameters: string[] = [];
  // const themesInFilterParameters: string[] = [];

  // model.courses.map(course => {
  //   coursesInFilterParameters.push(course.courseName);
  //   course.groups.map(group => {
  //     groupsInFilterParameters.push(course.courseName + " " + group.groupName);
  //     group.homeworks.map(homework => {
  //       homework.themes.map(theme => {
  //         if (themesInFilterParameters.indexOf(theme) == -1) {
  //           themesInFilterParameters.push(theme);
  //         }
  //       })
  //     })
  //   })
  // });

  // const filterParameters: FilterParameter[] = [
  //   new CourseFilter(coursesInFilterParameters),
  //   new GroupFilter(groupsInFilterParameters),
  //   new ThemeFilter(themesInFilterParameters)
  // ];

  // const [visibility, setVisibility] = useState("");
  // const deleteHomeworkHandler = () => {
  //   setVisibility("visible");
  // }

  // const CloseModalHandler = () => {
  //   setVisibility("");
  // }

  // return (
  //   <div className="container">
  //     <Filters
  //       filterParameters={(() => {
  //         props.roleId != 6 && filterParameters.splice(1, 1)
  //         return filterParameters
  //       })()}></Filters>
  //     {model.courses.map(course =>
  //       course.groups.map(group =>
  //         group.homeworks.map(homework =>
  //         (<HomeworkRow
  //           key={homework.id}
  //           RoleId={props.roleId}
  //           Course={course.courseName}
  //           Group={group.groupName}
  //           Themes={homework.themes.length ? homework.themes : ["без темы"]}
  //           HomeworkObject={homework}
  //           onDeleteClick={deleteHomeworkHandler}></HomeworkRow>))))
  //     }
  //     <DeleteHomeworkModal Visibility={visibility} CloseModalHandler={CloseModalHandler}></DeleteHomeworkModal>
  //   </div>
  // );
  return (<></>)
}

export default HomeworkPage;
