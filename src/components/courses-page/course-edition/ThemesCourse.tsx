import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Course } from '../../../interfaces/Courses';
import { Themes } from "../../../interfaces/Themes";

interface ThemesCourseProps {
    course: Course;
}

function ThemesCourse (props: ThemesCourseProps) {

    useEffect(() => {
        console.log(props.course);
    }, []);
    //let themes: Themes[] = [];

    const [themes, setThemes] = useState(props.course?.themes);

    return (
        <>
            {
                themes?.map((theme) => (
                    <div className="theme">
                        <div className="theme-name">{theme.name}</div>
                        <div className="theme-delete">
                            <button /* onClick={() => deleteThemeFromCourse(theme)} */ className='button-theme-delete'>
                                <FontAwesomeIcon icon="minus" />
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ThemesCourse;

