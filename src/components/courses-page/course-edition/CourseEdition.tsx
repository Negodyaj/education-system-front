import './CourseEdition.css';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Themes } from '../../../shared/themes/Themes';
import React from 'react';
import SearchComponent from '../../../shared/components/search-component/SearchComponent';
import { Course } from '../../../shared/courses/Courses';
import { sendDeleteRequest, sendDeleteRequestNoResponse, sendGetRequest, sendPostRequest } from '../../../services/http.service';
import NotificationData from '../../../shared/interfaces/NotificationData';
import { CourseCourseIdEnd, CourseIdThemeIdDeleteEnd, CourseIdThemeIdAddEnd, CourseThemesEnd } from '../../../shared/endpointConsts';
import { responseHandlers } from '../../../services/response-handler/responseHandler';

interface CourseEditionProps{
    idCourse: string;
    sendNewNotification: (newNotification: NotificationData | undefined) => void;
}

interface NewThemeCourse {
    idCourse: number;
    idTheme: number;
}

function CourseEdition(props: CourseEditionProps) {

    let currentCourse = {} as Course | undefined;
    let themesCurrentCourse: Themes[] = [];
    let themesList: Themes[] = [];
    let nameThemesCourse: string[] = [];
    let indexCourse = Number(props.idCourse.replace(/[a-z-A-Z\/]/g, ""));
    
    const [themesCourse, setThemesCourse] = useState<Themes[] | undefined>(themesCurrentCourse);
    const [allThemes, setAllThemes] = useState<Themes[] | undefined>(themesList);
    const [searchTurn, setSearchTurn] = useState('');
    const [nameThemes, setNameThemes] = useState(nameThemesCourse);
    const [courseName, setCourseName] = useState(currentCourse);
    const [changeDisplayingButtonOpenProgramCourse, setChangeDisplayingButtonOpenProgramCourse] = useState(false);
    const [changeDisplayingButtonOpenMaterialsCourse, setChangeDisplayingButtonOpenMaterialsCourse] = useState(false);
    const [isClassOnProgramCourse, setIsClassOnProgramCourse] = useState(' unvisible');
    const [isClassOnMaterialTheme, setIsClassOnMaterialTheme] = useState(' unvisible'); 

    const getAllThemes = async() => {
        setAllThemes(await sendGetRequest<Themes[]>(CourseThemesEnd, props.sendNewNotification, responseHandlers[CourseThemesEnd]));
        console.log(allThemes);
    }

    const getCourseById = async (id: number) => {
        const dataCourse = await sendGetRequest<Course>(CourseCourseIdEnd + id, props.sendNewNotification, responseHandlers[CourseCourseIdEnd]);
        return dataCourse;
    };

    const updateCourseThemes = async () => {
        currentCourse = await getCourseById(indexCourse);
        setCourseName(currentCourse);
        checkThemes(currentCourse as Course);
        setThemesCourse(currentCourse?.themes);
    } 

    
    const addThemeCourse = (newThemeCourse: NewThemeCourse) => {
        let str = 'Course/' + newThemeCourse.idCourse + '/theme/' + newThemeCourse.idTheme;
        sendPostRequest<Themes>(str, props.sendNewNotification, responseHandlers[CourseIdThemeIdAddEnd]);
        setTimeout (() => updateCourseThemes(), 200);
    }

    const deleteThemeCourse = (newThemeCourse: NewThemeCourse) => {
        let str = 'Course/' + newThemeCourse.idCourse + '/theme/' + newThemeCourse.idTheme;
        sendDeleteRequestNoResponse(str, props.sendNewNotification, responseHandlers[CourseIdThemeIdDeleteEnd]);
        setTimeout (() => updateCourseThemes(), 200);
    }

    const checkThemes = (course: Course) => {
        course.themes.map((theme) => (
            nameThemesCourse.push(theme.name)
        ))
        setNameThemes(nameThemesCourse);
    }
    
    useEffect(() => {
        getAllThemes();
        updateCourseThemes();
    }, []);

        
    const addNewThemeInProgramCourse = (theme: Themes) => {
        if (checkTheThemeInTheCourse(theme) === 0) { 
            let newTheme: NewThemeCourse = {idCourse: indexCourse, idTheme: theme.id};
            addThemeCourse(newTheme);
            setTimeout (() => setChangeDisplayingButtonOpenProgramCourse(true), 200);
            setTimeout(() => setIsClassOnProgramCourse(' visible'), 200);
        }
    }

    const checkTheThemeInTheCourse = (theme: Themes): number => {
        let count = 0;
        for (let item of themesCourse as Themes[]) {
            if (item.name === theme.name) {
                count++;
                break;
            }
        }
        return count;
    }

    const deleteThemeFromCourse = (theme: Themes) => {
        let newTheme: NewThemeCourse = {idCourse: indexCourse, idTheme: theme.id};
        deleteThemeCourse(newTheme);
    } 

    const searchFromTheme = (str: string) => {
        setSearchTurn(str);
    }

    const openProgramCourse = () => {
        setChangeDisplayingButtonOpenProgramCourse(!changeDisplayingButtonOpenProgramCourse);
        isClassOnProgramCourse === ' unvisible' ? setIsClassOnProgramCourse(' visible') : setIsClassOnProgramCourse(' unvisible');
    }

    const openMaterialsCourse = () => {
        setChangeDisplayingButtonOpenMaterialsCourse(!changeDisplayingButtonOpenMaterialsCourse);
        isClassOnMaterialTheme === ' unvisible' ? setIsClassOnMaterialTheme(' visible') : setIsClassOnMaterialTheme(' unvisible');

    }
    

    return (
    <div className="course-edition-container">
        <h3 className="current-course-header-name">{ 'Курс ' + courseName?.name }</h3>
        <div className='course-update'>
            <div className='new-themes-course'>
                <div className="new-themes-course-header">
                    <div className="new-themes-header-text">Темы для курса</div>
                    <button className="new-themes-header-button-add">
                        <FontAwesomeIcon icon="plus" />
                    </button>
                </div>
                <div className="new-themes-container">
                    <SearchComponent funcSearch={searchFromTheme}/>
                    {
                        allThemes?.filter((item) => {
                            if (item.name.toLowerCase().includes(searchTurn.toLowerCase())) {
                                return item;
                            } 
                        })
                        .map((item) => (
                            <div key={item.id} className={"new-theme "}>
                                <div className="new-theme-name">{item.name}</div>
                                <div className="new-theme-add">
                                    <button onClick={() => addNewThemeInProgramCourse(item)} className="button-add-theme">
                                    {
                                        nameThemes.includes(item.name) ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="plus" />
                                    }
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="current-course-container">
                <div className="program-current-course-container">
                    <div onClick={openProgramCourse}  className="program-course-header">
                        <button onClick={openProgramCourse} className="program-course-header-button-open">
                            {
                                changeDisplayingButtonOpenProgramCourse ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-up" />
                            }
                        </button>
                        <div className="program-course-header-text">Программа курса</div>
                    </div>
                    <div className={"program-course" + isClassOnProgramCourse}>
                        {
                            themesCourse?.map((theme) => (
                                <div key={theme.id} className="theme">
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
                <div className="materials-current-course-container">
                    <div onClick={openMaterialsCourse} className={"materials-course-header" + isClassOnMaterialTheme}>
                        <button onClick={openMaterialsCourse} className="materials-course-header-button-open">
                            {
                                changeDisplayingButtonOpenMaterialsCourse ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-up" />
                            }
                        </button>
                        <div className="materials-course-header-text">Материалы курса</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CourseEdition;
