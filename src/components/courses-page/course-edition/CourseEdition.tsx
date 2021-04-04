import './CourseEdition.css';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Themes } from '../../../shared/themes/Themes';
import React from 'react';
import SearchComponent from '../../../shared/components/search-component/SearchComponent';
import { Course } from '../../../shared/courses/Courses';


interface CourseEditionProps{
    themesList: Themes[];
    idCourse: string;
}

function CourseEdition(props: CourseEditionProps) {

    const url = 'https://80.78.240.16:7070/api/Course/';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJuYmYiOjE2MTc0ODA0MTQsImV4cCI6MTYxNzY1MzIxNCwiaXNzIjoiRWR1Y2F0aW9uU3lzdGVtLkFwaSIsImF1ZCI6IkRldkVkdWNhdGlvbiJ9.tMl6BGk_i_ZwTDtQzMZ-dgFgG5II4Aal95iaz8rPE9o' ;

    const getCourseById = (id: string) => {
        fetch(url + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let currentCourse: Course = data;
                setThemesCourse(currentCourse.themes);
            })
            .catch(error => console.log('Ошибка ' + error))
    }

    useEffect(() => {
        getCourseById(props.idCourse);
    }, []);

    let newThemeCourse = {} as Themes;
    let currentCourse: Themes[] = [];
    let indexCourse = Number(props.idCourse.slice(-1)) - 1;
    let allThemesCourses: Themes[][] = [];
    let filterNameThemes: string[] = [];

    let currentThemesCourse: Themes[] = []; 
    
    const [themesCourse, setThemesCourse] = useState(currentThemesCourse);
    const [allThemes, setAllThemes] = useState(props.themesList);
    const [searchTurn, setSearchTurn] = useState('');
        
    const addNewThemeInProgramCourse = (item: Themes) => {
        let count = 0;
        for (let theme of themesCourse) {
            if (theme.name === item.name) {
                count++;
            }
        }
        if (count === 0) {
            newThemeCourse = { id: themesCourse.length + 1, name: item.name, check: true };
            currentCourse = themesCourse;
            currentCourse.push(newThemeCourse);
            setThemesCourse([...currentCourse]);
            themesCourse.forEach((item) => { filterNameThemes.push(item.name) });
            for (let i of allThemes) {
                if (filterNameThemes.includes(i.name)) {
                    i.check = true;
                }
            }
            setAllThemes([...allThemes]);
        }
    }

    const deleteThemeFromCourse = (theme: Themes) => {
        let index = -1;
        for (let item of allThemes) {
            if (theme.name === item.name) {
                index = allThemes.indexOf(item);
            }
        }
        if (index >= 0) {
            allThemes[index].check = false;
            setAllThemes([...allThemes]);
        }
        currentCourse = themesCourse;
        currentCourse.splice(themesCourse.indexOf(theme), 1);
        setThemesCourse([...currentCourse]);
    }

    const searchFromTheme = (str: string) => {
        setSearchTurn(str);
    }

    return (
    <div className="course-edition-container">
      <div className='course-update'>
        <div className='new-themes-course'>
            <div className="new-themes-header">Темы для курса</div>
            <div className="new-themes-container">
                <SearchComponent funcSearch={searchFromTheme}/>
                {
                    allThemes.filter((item) => {
                        if (item.name.toLowerCase().includes(searchTurn.toLowerCase())) {
                            return item;
                        } 
                    })
                    .map((item, key) => (
                        <div key={key} className={"new-theme "+ item.check}>
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
