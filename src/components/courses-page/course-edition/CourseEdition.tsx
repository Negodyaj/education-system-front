import './CourseEdition.css';
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Themes } from '../../../interfaces/Themes';
import SearchComponent from '../../../shared/components/search-component/SearchComponent';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { addThemeInCourse, deleteThemeCourse, getCourseById, getThemes } from '../../../store/course-edition/thunk';
import { setNameAllThemesInCourse, setChangeDisplayingButtonOpenProgramCourse, setChangeDisplayingButtonOpenMaterialsCourse, setChangeDisplayingButtonCloseProgramCourse, setChangeDisplayingButtonCloseMaterialsCourse } from '../../../store/course-edition/action-creators';

export interface NewThemeCourse {
    idCourse: number;
    idTheme: number;
}

interface ParamTypes {
    id: string;
}

function CourseEdition() {

    const dispatch = useDispatch();
    const pageState = useSelector(((state: IRootState) => state.courseEditionPage));
    let { id } = useParams<ParamTypes>();
    
    let nameThemesCourse: string[] = [];
    let idCourse = Number(id);

    useEffect(() => {
        dispatch(getThemes());
        dispatch(getCourseById(idCourse));
        closeProgramCourse();
        closeMaterialsCourse();
        checkThemes();
    }, []);

    useEffect(() => {
        checkThemes();
    }, [pageState.course.themes]);

    const [searchTurn, setSearchTurn] = useState('');

    const addNewThemeInProgramCourse = (theme: Themes) => {
        if (checkTheThemeInTheCourse(theme) === 0) { 
            let newTheme: NewThemeCourse = {idCourse: idCourse, idTheme: theme.id};
            dispatch(addThemeInCourse(newTheme));
            openProgramCourse();
        }
    }

    const checkTheThemeInTheCourse = (theme: Themes): number => {
        let count = 0;
        for (let item of pageState.course.themes) {
            if (item.name === theme.name) {
                count++;
                break;
            }
        }
        return count;
    } 

    const checkThemes = () => {
        pageState.course.themes.map((theme) => (
            nameThemesCourse.push(theme.name)
        ))
        dispatch(setNameAllThemesInCourse(nameThemesCourse));
    }

    const deleteThemeFromCourse = (theme: Themes) => {
        let newTheme: NewThemeCourse = {idCourse: idCourse, idTheme: theme.id};
        dispatch(deleteThemeCourse(newTheme));
    } 

    const searchFromTheme = (str: string) => {
        setSearchTurn(str);
    }

    const openProgramCourse = () => {
        dispatch(setChangeDisplayingButtonOpenProgramCourse());
    }

    const closeProgramCourse = () => {
        dispatch(setChangeDisplayingButtonCloseProgramCourse());
    }

    const openMaterialsCourse = () => {
        dispatch(setChangeDisplayingButtonOpenMaterialsCourse());
    }

    const closeMaterialsCourse = () => {
        dispatch(setChangeDisplayingButtonCloseMaterialsCourse());
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
                    <SearchComponent funcSearch={searchFromTheme}/>
                    {
                        pageState.themes?.filter((item) => {
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
                                        pageState.nameThemesCourse.includes(item.name) ? <FontAwesomeIcon icon="check" /> : <FontAwesomeIcon icon="plus" />
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
                            { pageState.isDisplayingButtonOpenProgramCourse ?
                                <button onClick={closeProgramCourse} className="program-course-header-button-open">
                                    <FontAwesomeIcon icon="angle-down" />
                                </button>
                                :
                                <button onClick={openProgramCourse} className="program-course-header-button-open">
                                    <FontAwesomeIcon icon="angle-up" />
                                </button>
                            }
                            <div className="program-course-header-text">Программа курса</div>
                        </div>
                    <div className={"program-course"}>
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
                        { pageState.isDisplayingButtonOpenMaterialsCourse ?
                            <button onClick={closeMaterialsCourse} className="materials-course-header-button-open">
                                <FontAwesomeIcon icon="angle-down" />
                            </button>
                            :
                            <button onClick={openMaterialsCourse} className="materials-course-header-button-open">
                                <FontAwesomeIcon icon="angle-up" />
                            </button>
                        }
                        <div className="materials-course-header-text">Материалы курса</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CourseEdition;
