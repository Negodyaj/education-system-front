import React, { useState } from 'react';
import { Link, Route, Switch, useParams } from 'react-router-dom';

import './GroupNavMenu.css';

function GroupNavMenu() {
  const [toggleState, setToggleState] = useState('info');

  const toggleTab = (displayName: string) => {
    setToggleState(displayName);
  };
  const key = () => {
    console.log('ura');
  };

  return (
    <div className="bloc-tabs" role='button' onClick= {() => toggleTab('info')} onKeyPress={key}>
      <Link
        to={`/group/${toggleState}`}
        className={toggleState === 'info' ? 'tabs active-tabs' : 'tabs'}
        onClick={() => toggleTab('info')}>
        Общее
      </Link>
      <Link
        to={`/group/${toggleState}`}
        className={toggleState === 'lesson' ? 'tabs active-tabs' : 'tabs'}
        onClick={() => toggleTab('lesson')}>
        Занятия
      </Link>
    </div>
  );
}

export default GroupNavMenu;
