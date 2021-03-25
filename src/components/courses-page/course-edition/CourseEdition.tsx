import './CourseEdition.css';
import { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CourseEdition = () => {
    
    const newThemes = [ 
        { id: 1, name: 'HTML' }, 
        { id: 2, name: 'CSS' }, 
        { id: 3, name: 'JS' },
        { id: 4, name: 'React' } 
    ];

    const themesCourse = [ 
        { id: 1, name: 'TypeScript' }, 
        { id: 2, name: 'Props' }, 
    ];

  return (
    <div className="course-edition-container">
      <div className='course-update'>
        <div className='new-themes-course'>
            <div className="new-themes-header">Темы для курса</div>
            <div className="new-themes-container">
            {
                newThemes.map((item) => (
                    <div className="new-theme">
                        <div className="new-theme-name">{item.name}</div>
                        <div className="new-theme-add">
                            <button className="button-add-theme">
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
                    themesCourse.map((item) => (
                        <div className="theme">{item.name}</div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default CourseEdition;