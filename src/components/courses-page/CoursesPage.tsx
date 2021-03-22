import './CoursesPage.css';

interface CoursesPageProps {
    roleId: number;
}

function CoursesPage(props: CoursesPageProps) {

    const courses = [ 
        { name: 'C# base' }, 
        { name: 'Backend' }, 
        { name: 'Frontend' },
        { name: 'Mobile development' } 
    ];

    return(
        <div className="course-container">
            <div className="course-create">
                <button className='button-create'>Добавить курс</button>
            </div>
            <div className="courses-list">
                {
                    courses.map(item => (
                        <div className="course">
                            <div className="course-name">{item.name}</div>
                            <div className="course-update-delete">
                                <button className='button-update'></button>
                                <button className='button-delete'></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CoursesPage;