import './CourseEdition.css';
import { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Course } from '../../../shared/courses/Courses';
import { Themes } from '../../../shared/themes/Themes';


interface CourseEditionProps{
    coursesList: Course[];
    themesList: Themes[];
    idCourse: string;
}

function CourseEdition(props: CourseEditionProps) {

    let newThemeCourse = {} as Themes;
    let currentCourse: Themes[] = [];
    let indexCourse = Number(props.idCourse.slice(-1)) - 1;
    let allThemesCourses: Themes[][] = [];

    for(let i = 0; i < props.coursesList.length; i++) {
        allThemesCourses.push(props.themesList);
    }

    const [themesCourse, setThemesCourse] = useState(props.coursesList[indexCourse].themes);
    const [allThemes, setAllThemes] = useState(allThemesCourses[indexCourse]);
    const [choiseTheme, setChoiseTheme] = useState('');
    
    const addNewThemeInProgramCourse = (item: Themes) => {
        let count = 0;
        for(let theme of themesCourse) {
            if(theme.name === item.name) {
                count++;
            }
        }
        if (count === 0) {
            let indexTheme = allThemes.indexOf(item);
            allThemes[indexTheme].check = true;
            setAllThemes([...allThemes]);
            newThemeCourse = {id: themesCourse.length + 1, name: item.name, check: true};
            currentCourse = themesCourse;
            currentCourse.push(newThemeCourse);
            setThemesCourse([...currentCourse]);
        }
    }

    const deleteThemeFromCourse = (theme: Themes) => {
        let index = -1;
        for(let item of allThemes) {
            if(theme.name === item.name) {
                index = allThemes.indexOf(item);
            }
        }
        if(index >= 0) {
            allThemes[index].check = false;
            setAllThemes([...allThemes]);
        } 
        currentCourse = themesCourse;
        currentCourse.splice(themesCourse.indexOf(theme), 1);
        setThemesCourse([...currentCourse]);
    }

    return (
    <div className="course-edition-container">
      <div className='course-update'>
        <div className='new-themes-course'>
            <div className="new-themes-header">Темы для курса</div>
            <div className="new-themes-container">
            {
                 allThemes.map((item) => (
                    <div className={"new-theme "+ item.check}>
                        <div className="new-theme-name">{item.name}</div>
                        <div className="new-theme-add">
                            <button onClick={() => addNewThemeInProgramCourse(item)} className="button-add-theme">
                                {
                                    item.check ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="plus" />
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
                                <button onClick={() => deleteThemeFromCourse(theme)} className='button-theme-delete'>
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