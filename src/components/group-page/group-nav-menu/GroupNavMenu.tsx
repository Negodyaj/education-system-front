import React, { useState } from 'react';
import { Link, Route, Switch, useParams } from 'react-router-dom';

import './GroupNavMenu.css';

interface ParamTypes {
  id: string;
}

function GroupNavMenu() {
  const [toggleState, setToggleState] = useState('info');

  const id = useParams<ParamTypes>();
  console.log(id.id);
  const toggleTab = (displayName: string) => {
    setToggleState(displayName);
  };

  return (
    <div className="bloc-tabs">
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
