import React, { useState } from "react"
import { Link } from "react-router-dom";
import './GroupNavMenu.css'




function GroupNavMenu() {
  const [toggleState, setToggleState] = useState('info');

  const toggleTab = (displayName: string) => {
    setToggleState(displayName);
   
  };

  return (
    <div className='group-menu-container'>
      <div className="bloc-tabs">
        <Link to='/group-page/info'
          className={toggleState === 'info' ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab('info')} >Общее</Link>
        <Link to='/group-page/lesson'
         className={toggleState === 'lessons' ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab('lessons')}> Lesson</Link> 
        <Link to='/group-page/journal'
          className={toggleState === 'journal' ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab('journal')}>Журнал</Link>
        <Link to='/group-page/statistics'
          className={toggleState === 'statistics' ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab('statistics')}>Статистика</Link>
      </div>
    </div>
  )
}

export default GroupNavMenu