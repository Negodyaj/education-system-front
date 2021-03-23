import './CourseEdition.css';
import { useState } from 'react';

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
    <div className="course-container">
      <div className='course-update'>
        <div className='theme-course'>
            {
                newThemes.map((item) => (
                    <div className="new-theme">{item.name}</div>
                ))
            }
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