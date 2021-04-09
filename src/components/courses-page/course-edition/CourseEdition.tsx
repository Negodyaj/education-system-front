import './CourseEdition.css';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Themes } from '../../../shared/themes/Themes';
import React from 'react';
import SearchComponent from '../../../shared/components/search-component/SearchComponent';
import { Course } from '../../../shared/courses/Courses';
import { sendGetRequest } from '../../../services/http.service';


interface CourseEditionProps{
    idCourse: string;
}

interface NewThemeCourse {
    idCourse: number;
    idTheme: number;
}

function CourseEdition(props: CourseEditionProps) {

    let currentCourse = {} as Course;
    let themesCurrentCourse: Themes[] = [];
    let indexCourse = Number(props.idCourse.replace(/[a-z-A-Z\/]/g, ""));
    let themesList: Themes[] = [];
    let checkThemes: Themes[] = [];
    
    const [themesCourse, setThemesCourse] = useState(themesCurrentCourse);
    const [allThemes, setAllThemes] = useState(themesList);
    const [searchTurn, setSearchTurn] = useState('');
    const [check, setCheck] = useState(themesCourse);
    const [course, setCourse] = useState(currentCourse);

    const url = 'https://80.78.240.16:7070/api/Course/';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwi0J_RgNC10L_QvtC00LDQstCw0YLQtdC70YwiLCLQnNC10L3QtdC00LbQtdGAIl0sIm5iZiI6MTYxNzg3Mzk2NywiZXhwIjoxNjE4MDQ2NzY3LCJpc3MiOiJFZHVjYXRpb25TeXN0ZW0uQXBpIiwiYXVkIjoiRGV2RWR1Y2F0aW9uIn0.HZXVQsbvTalFg3rtXiBAlHT9x7rACmyXXXfzyxfuam8' ;

    const getAllThemes = () => {
        fetch(url + 'theme/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setAllThemes(data);
            })
            .catch(error => console.log('Ошибка ' + error))
    }

    useEffect(() => {
        getAllThemes();
    }, []);

    const getCourseById = async (id: number) => {
        //setCourse(await sendGetRequest('Course/' + id)); 
    };

    useEffect(() => {
        getCourseById(indexCourse);
        console.log(course);
    }, []);

    const addThemeCourse = (newThemeCourse: NewThemeCourse) => {
        fetch(url + newThemeCourse.idCourse + '/theme/' + newThemeCourse.idTheme, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                getCourseById(indexCourse);
            })
            .catch(error => console.log('Ошибка ' + error))
    }

    const deleteThemeCourse = (newThemeCourse: NewThemeCourse) => {
        fetch(url + newThemeCourse.idCourse + '/theme/' + newThemeCourse.idTheme, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                getCourseById(indexCourse);
            })
            .catch(error => console.log('Ошибка ' + error))
    }
        
    const addNewThemeInProgramCourse = (theme: Themes) => {
        console.log(props.idCourse);
        let count = 0;
        for (let item of themesCourse) {
            if (item.name === theme.name) {
                count++;
            }
        }
        if (count === 0) { 
            let newTheme: NewThemeCourse = {idCourse: indexCourse, idTheme: theme.id};
            addThemeCourse(newTheme);
            checkThemes = check;
            checkThemes.push(theme); 
            setCheck(checkThemes);
            for(let item of check) {
                console.log(item);
            }
        }
    }

    const deleteThemeFromCourse = (theme: Themes) => {
        let newTheme: NewThemeCourse = {idCourse: indexCourse, idTheme: theme.id};
        deleteThemeCourse(newTheme);
        checkThemes = check;
        checkThemes.splice(checkThemes.indexOf(theme), 1);
        setCheck(checkThemes);
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
                        <div key={key} className={"new-theme "}>
                            <div className="new-theme-name">{item.name}</div>
                            <div className="new-theme-add">
                                <button onClick={() => addNewThemeInProgramCourse(item)} className="button-add-theme">
                                {
                                    check.includes(item) ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="plus" />
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
                    themesCourse?.map((theme) => (
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
