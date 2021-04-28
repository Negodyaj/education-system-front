import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootState } from "../../../store";
import { setChangeDisplayingButtonOpenMaterialsCourse, setChangeDisplayingButtonOpenProgramCourse } from "../../../store/course-edition/action-creators";
import { getCourseById } from "../../../store/course-edition/thunk";

interface ParamTypes {
    id: string;
}

function Course() {

    const dispatch = useDispatch();
    const pageState = useSelector(((state: IRootState) => state.courseEditionPage));
    let { id } = useParams<ParamTypes>();
    
    const idCourse = +id;

    useEffect(() => {
        dispatch(getCourseById(idCourse));
    }, []);
    
    const openProgramCourse = () => {
        dispatch(setChangeDisplayingButtonOpenProgramCourse());
    }

    const openMaterialsCourse = () => {
        dispatch(setChangeDisplayingButtonOpenMaterialsCourse());
    }
    
    return(
        <div className="course-edition-container">
            <h3 className="current-course-header-name">{ 'Курс ' + pageState.course.name }</h3>
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
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Course;