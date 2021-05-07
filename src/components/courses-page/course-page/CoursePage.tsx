import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IRootState } from '../../../store';
import {
  setChangeDisplayingButtonOpenMaterialsCourse,
  setChangeDisplayingButtonOpenProgramCourse,
} from '../../../store/course-edition/action-creators';
import { getCourseById } from '../../../store/course-edition/thunk';
import './CoursePage.css';

interface ParamTypes {
  id: string;
}

function Course() {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.courseEditionPage);
  let { id } = useParams<ParamTypes>();

  const idCourse = +id;

  useEffect(() => {
    dispatch(getCourseById(idCourse));
  }, []);

  const openProgramCourse = () => {
    dispatch(setChangeDisplayingButtonOpenProgramCourse());
  };

  const openMaterialsCourse = () => {
    dispatch(setChangeDisplayingButtonOpenMaterialsCourse());
  };

  return (
      <div className="course-read-only-container">
          <h3 className="course-read-only-header">{ `Курс ${  pageState.course.name}` }</h3>
          <div className="course-read-only">
              <div className="program-course-read-only-container">
                      <div className="program-course-read-only-header">
                              <button onClick={openProgramCourse} className="program-course-read-only-header-button-open">
                                  { 
                                        pageState.isDisplayingButtonOpenProgramCourse ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-up" /> 
              )}
            </button>
                              <div className="program-course-read-only-header-text">Программа курса</div>
            </div>
                      <div className="program-course-read-only">
                          { pageState.isDisplayingButtonOpenProgramCourse &&
              pageState.course.themes?.map((theme) => (
                                  <div key={theme.id} className="theme-course-read-only">
                                      <div className="theme-name-course-read-only">{theme.name}</div>
                    {theme.name}
                  </div>
                </div>
              ))}
          </div>
        </div>
              <div className="materials-course-read-only-container">
                      <div className="materials-course-read-only-header">
                          <button onClick={openMaterialsCourse} className="materials-course-read-only-header-button-open">
                              { 
                                    pageState.isDisplayingButtonOpenMaterialsCourse ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-up" /> 
              )}
            </button>
                          <div className="materials-course-read-only-header-text">Материалы курса</div>
            </div>
                      <div className="materials-course-read-only">
                          { pageState.isDisplayingButtonOpenMaterialsCourse &&
              pageState.course.materials?.map((material) => (
                                  <div key={material.id} className="material-course-read-only">
                                      <div className="material-content-course-read-only">
                                          <a href={material.link} title={material.link} target="_blank" className="link-material-course-read-only" rel="noreferrer">{material.description}</ a>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
            </div>
        </div>
  );
}

export default Course;
