import "../group-journal/GroupJournal.css";

const GroupJournal = () => {
    return(
        <div className='journal-container'>
          <div className="journal-head">
            <div className="sort-menu"> Тут лежит какое-то меню для сортировок фильтров и тп</div>
          </div>
          <div className="journal-visible">
            <table>
              <tr className='table-row'>
                <th>id</th>
                <th>ФИО</th>
              </tr>
              </table>
          </div>
        </div>
    )
}

export default GroupJournal;