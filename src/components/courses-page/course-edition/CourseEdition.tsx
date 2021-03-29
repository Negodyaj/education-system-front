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

    const [themesCourse, setThemesCourse] = useState(props.coursesList[0].themes);

    const addNewThemeInProgramCourse = (nameTheme: string) => {
        let count = 0;
        for(let theme of themesCourse) {
            if(theme.name === nameTheme) {
                count++;
            }
        }
        if (count === 0) {
            newThemeCourse = {id: themesCourse.length + 1, name: nameTheme};
            currentCourse = themesCourse;
            currentCourse.push(newThemeCourse);
            for(let i of currentCourse) {
                console.log(i);
            }
            setThemesCourse(currentCourse);
        }
    }

    const deleteThemeFromCourse = (themeId: number) => {
        currentCourse = themesCourse;
        currentCourse.splice(themeId - 1, 1);
        for(let i of currentCourse) {
            console.log(i);
        }
        setThemesCourse(currentCourse);
    }

    /*useEffect(() => {
        setThemesCourse(currentCourse);
    }, [themesCourse]);*/

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
                            <button onClick={() => addNewThemeInProgramCourse(item.name)} className="button-add-theme">
                                <FontAwesomeIcon icon="plus" />
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
                        <div key={theme.id} className="theme">
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