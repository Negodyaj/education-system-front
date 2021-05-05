import './CourseEdition.css';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Themes } from '../../../interfaces/Themes';
import SearchComponent from '../../../shared/components/search-component/SearchComponent';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { addThemeInCourse, deleteMaterialCourse, deleteThemeCourse, getCourseById, getThemes } from '../../../store/course-edition/thunk';
import { setAllThemesInCourse, setChangeDisplayingButtonOpenProgramCourse, setChangeDisplayingButtonOpenMaterialsCourse } from '../../../store/course-edition/action-creators';
import { Material } from '../../../interfaces/Materials';

export interface CourseTheme {
    idCourse: number;
    idTheme: number;
}

export interface CourseMaterial {
    idCourse: number;
    idMaterial: number;
}

interface ParamTypes {
    id: string;
}

function CourseEdition() {

    const dispatch = useDispatch();
    const pageState = useSelector(((state: IRootState) => state.courseEditionPage));
    let { id } = useParams<ParamTypes>();
    
    let themesInCourse: number[] = [];
    const idCourse = +id;

    useEffect(() => {
        dispatch(getThemes());
        dispatch(getCourseById(idCourse));
    }, []);

    useEffect(() => {
        checkThemes();
    }, [pageState.course.themes]);

    const [searchWord, setSearchWord] = useState('');

    const addNewThemeInProgramCourse = (theme: Themes) => {
        if (checkTheThemeInTheCourse(theme.id)) { 
            const courseTheme: CourseTheme = {idCourse: idCourse, idTheme: theme.id};
            dispatch(addThemeInCourse(courseTheme));
            !pageState.isDisplayingButtonOpenProgramCourse && openProgramCourse();
        }
    }

    const checkTheThemeInTheCourse = (themeId: number): boolean => {
        const theme = pageState.course.themes.find(t => t.id === themeId);
        return theme === undefined;
    } 

    const checkThemes = () => {
        pageState.course.themes?.map((theme) => (
            themesInCourse.push(theme.id)
        ))
        dispatch(setAllThemesInCourse(themesInCourse));
    }

    const deleteThemeFromCourse = (theme: Themes) => {
        const courseTheme: CourseTheme = {idCourse: idCourse, idTheme: theme.id};
        dispatch(deleteThemeCourse(courseTheme));
    } 

    const deleteMaterialFromCourse = (material: Material) => {
        const courseMaterial: CourseMaterial = {idCourse: idCourse, idMaterial: material.id};
        dispatch(deleteMaterialCourse(courseMaterial));
    } 

    const searchInThemes = (str: string) => {
        setSearchWord(str);
    }

    const openProgramCourse = () => {
        dispatch(setChangeDisplayingButtonOpenProgramCourse());
    }

    const openMaterialsCourse = () => {
        dispatch(setChangeDisplayingButtonOpenMaterialsCourse());
    }

    return (
    <div className="course-edition-container">
        <h3 className="current-course-header-name">{ 'Курс ' + pageState.course.name }</h3>
        <div className='course-update'>
            <div className='new-themes-course'>
                <div className="new-themes-course-header">
                    <div className="new-themes-header-text">Темы для курса</div>
                    <button className="new-themes-header-button-add">
                        <FontAwesomeIcon icon="plus" />
                    </button>
                </div>
                <div className="new-themes-container">
                    <SearchComponent funcSearch={searchInThemes}/>
                    {
                        pageState.themes?.filter(item => item.name.toLowerCase().includes(searchWord.toLowerCase()))
                        .map((item) => (
                            <div key={item.id} className="new-theme ">
                                <div className="new-theme-name">{item.name}</div>
                                <div className="new-theme-add">
                                    <button onClick={() => addNewThemeInProgramCourse(item)} className="button-add-theme">
                                    {
                                        pageState.idThemesCourse.includes(item.id) ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="plus" />
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
                        <div className="program-course-header">
                            <button onClick={openProgramCourse} className="program-course-header-button-open">
                                { 
                                    pageState.isDisplayingButtonOpenProgramCourse ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-up" /> 
                                }
                            </button>
                            <div className="program-course-header-text">Программа курса</div>
                        </div>
                    <div className="program-course">
                        { pageState.isDisplayingButtonOpenProgramCourse &&
                            pageState.course.themes?.map((theme) => (
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
                    <div className={"materials-course-header"}>
                        <button onClick={openMaterialsCourse} className="materials-course-header-button-open">
                            { 
                                pageState.isDisplayingButtonOpenMaterialsCourse ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-up" /> 
                            }
                        </button>
                        <div className="materials-course-header-text">Материалы курса</div>
                    </div>
                    <div className="materials-course">
                        { pageState.isDisplayingButtonOpenMaterialsCourse &&
                            pageState.course.materials?.map((material) => (
                                <div key={material.id} className="material">
                                    <div className="material-content">
                                        <a href={material.link} title={material.link} target="_blank" className="link-material">{material.description}</ a>
                                    </div>
                                    <div className="material-delete">
                                        <button onClick={() => deleteMaterialFromCourse(material)} className='button-material-delete'>
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
    </div>
    )
}

export default CourseEdition;
