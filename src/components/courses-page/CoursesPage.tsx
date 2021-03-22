import './CoursesPage.css';

interface CoursesPageProps {
    roleId: number;
}

function CoursesPage(props: CoursesPageProps) {

    const courses = [ 
        { id: 1, name: 'C# base' }, 
        { id: 2, name: 'Backend' }, 
        { id: 3, name: 'Frontend' },
        { id: 4, name: 'Mobile development' } 
    ];

    return(
        <div className="course-container">
            <div className="course-create">
                <button className='button-create'>Добавить курс</button>
            </div>
            <div className="courses-list">
                {
                    courses.map(item => (
                        <div key={item.id} className="course">
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