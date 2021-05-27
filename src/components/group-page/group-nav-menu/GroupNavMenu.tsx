import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './GroupNavMenu.css';

function GroupNavMenu() {
  const { url } = useRouteMatch();
  const [toggleState, setToggleState] = useState('info');

  const toggleTab = (displayName: string) => {
    setToggleState(displayName);
  };

  return (
    <div className="group-menu-container">
      <div className="bloc-tabs">
        <Link
          to={`${url}/info`}
          className={toggleState === 'info' ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab('info')}>
          Общее
        </Link>
        <Link
          to={`${url}/lesson`}
          className={toggleState === 'lessons' ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab('lessons')}>
          Занятия
        </Link>
        <Link
          to={`${url}/journal`}
          className={toggleState === 'journal' ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab('journal')}>
          Журнал
        </Link>
      </div>
    </div>
  );
}

export default GroupNavMenu;
