import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Role } from '../../enums/role';

import NavMenuDropdownLink, {
  DropdownLinkParams,
} from './components/NavMenuDropdownLink';
import NavMenuSimpleLink from './components/NavMenuSimpleLink';
import './NavMenu.css';

interface NavMenuProps {
    roleId: number,
    onHide: (condition: boolean) => void
    onShangeMode: (condition: boolean) => void
}

function NavMenu(props: NavMenuProps) {
  const { roleId, onHide } = props;
    const [isHidden, setHidden] = useState(false);
    const [isDark, setMode] = useState(false);

    let changeMode = () => {
        isDark ? setMode(false) : setMode(true);
        props.onShangeMode(isDark);
    }

    let changeHidden = () => {
        isHidden ? setHidden(false) : setHidden(true);
        props.onHide(isHidden);
    }
            return true;
        return false;
    }
    const defaultShowFilter = (link: DropdownLinkParams) => {
        if (link.routeParam == "1" || link.routeParam == "2")

  const defaultShowFilter = (link: DropdownLinkParams) => {
    if (link.routeParam === '1' || link.routeParam === '2') return true;

    return false;
  };

  return (
    <div className="menu-container">
      <nav className={isHidden ? 'notshow' : 'vision'}>
        {(roleId === Role.Admin || roleId === Role.Manager) && (
          <NavMenuSimpleLink
            route="user-list"
            faIcon="user"
            label="Пользователи"
          />
        )}
        {(roleId === Role.Teacher || roleId === Role.Methodist) && (
          <NavMenuSimpleLink
            route="homework"
            faIcon="book-reader"
            label="Домашки"
          />
        )}
        {(roleId === Role.Teacher || roleId === Role.Methodist) && (
          <NavMenuSimpleLink
            route="courses-page"
            faIcon="university"
            label="Курсы"
          />
        )}
        {(roleId === Role.Teacher || roleId === Role.Methodist) && (
          <NavMenuSimpleLink
            route="attendance"
            faIcon="university"
            label="Журнал в разработке"
          />
        )}
        {(roleId === Role.Teacher || roleId === Role.Methodist) && (
          <NavMenuSimpleLink
            route="lessons"
            faIcon="university"
            label="Занятия"
          />
        )}
        {roleId !== Role.Student && (
          <NavMenuSimpleLink route="tags-page" faIcon="tag" label="Тэги" />
        )}
        {roleId !== Role.Methodist && (
          <NavMenuDropdownLink
            route="group"
            faIcon="user"
            label="Группы"
            dropdownLinks={[
              { label: 'one', routeParam: '1' },
              { label: 'two', routeParam: '2' },
              { label: 'three', routeParam: '3' },
              { label: 'four', routeParam: '4' },
            ]}
            alwaysShowAll={false}
            defaultShowFilter={defaultShowFilter}
          />
        )}
      </nav>
      <button
        className={`${
          isHidden ? 'left button-update' : 'right button-update'
        } round-button`}
        onClick={changeHidden}
        title={isHidden ? 'развернуть меню' : 'свернуть меню'}>
        <FontAwesomeIcon icon="angle-double-right" />
      </button>
    </div>
  );
}

export default NavMenu;
