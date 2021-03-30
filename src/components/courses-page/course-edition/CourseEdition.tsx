import './CourseEdition.css';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Course } from '../../../shared/courses/Courses';
import { Themes } from '../../../shared/themes/Themes';
import { threadId } from 'node:worker_threads';

interface CourseEditionProps{
    coursesList: Course[];
    themesList: Themes[];
}

function CourseEdition(props: CourseEditionProps) {
    
    let newThemeCourse = {} as Themes;
    let currentCourse: Themes[] = [];

    let arrTheme: Boolean[] = [];
    let checkTheme: Boolean[] = [];

    for(let i in props.themesList) {
        arrTheme[i] = false;
    }

    const [themesCourse, setThemesCourse] = useState(props.coursesList[0].themes);
    
    const [isCheckButtonPlus, setIsCheckButtonPlus] = useState(arrTheme);

    const addNewThemeInProgramCourse = (item: Themes) => {
        let count = 0;
        for(let theme of themesCourse) {
            if(theme.name === item.name) {
                count++;
            }
        }
        if (count === 0) {
            newThemeCourse = {id: themesCourse.length + 1, name: item.name};
            currentCourse = themesCourse;
            currentCourse.push(newThemeCourse);
            /*for(let i of currentCourse) {
                console.log(i);
            }*/
            setThemesCourse(currentCourse);
            checkTheme = isCheckButtonPlus;
            checkTheme[props.themesList.indexOf(item)] = true;
            setIsCheckButtonPlus(checkTheme);
            /*for(let x of isCheckButtonPlus) {
                console.log(x);
            }*/
        }
    }

    const deleteThemeFromCourse = (themeId: number) => {
        let index = -1;
        for(let i in themesCourse) {
            if(themesCourse[i].id === themeId) {
                index = Number(i);
            }
        }
        if(index !== -1) {
            currentCourse = themesCourse;
            currentCourse.splice(index, 1);
            /*for(let i of currentCourse) {
                console.log(i);
            }*/
            setThemesCourse(currentCourse);
        }
    }

    return (
    <div className="course-edition-container">
      <div className='course-update'>
        <div className='new-themes-course'>
            <div className="new-themes-header">Темы для курса</div>
            <div className="new-themes-container">
            {
                 props.themesList.map((item) => (
                    <div className="new-theme">
                        <div className="new-theme-name">{item.name}</div>
                        <div className="new-theme-add">
                            <button onClick={() => addNewThemeInProgramCourse(item)} className="button-add-theme">
                                {
                                    isCheckButtonPlus ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="plus" />
                                }
                            </button>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
        <div className="program-course-container">
            <div className="program-course-header">Программа курса</div>
            <div className="program-course">
                {
                    themesCourse.map((theme) => (
                        <div className="theme">
                            <div className="theme-name">{theme.name}</div>
                            <div className="theme-delete">
                                <button onClick={() => deleteThemeFromCourse(theme.id)} className='button-theme-delete'>
                                    <FontAwesomeIcon icon="minus" />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
    )
}

export default CourseEdition;