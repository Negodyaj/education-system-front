/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Course } from '../../../shared/courses/Courses';
import { Themes } from "../../../shared/themes/Themes";

interface ThemesCourseProps {
    course: Course;
}

function ThemesCourse (props: ThemesCourseProps) {

    //let themes: Themes[] = [];

    const [themes, setThemes] = useState(props.course?.themes);

    return (
        <>
            {
                themes?.map((theme) => (
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
        </>
    )
} */

export {}