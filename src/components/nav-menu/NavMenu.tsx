import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Role } from '../../enums/role';

import NavMenuDropdownLink, {
  DropdownLinkParams,
} from './components/NavMenuDropdownLink';
import NavMenuSimpleLink from './components/NavMenuSimpleLink';
import { groupsForNavMenu } from './data/groups-mock';
import './NavMenu.css';

interface NavMenuProps {
  roleId: number;
  onHide: (condition: boolean) => void;
  onShangeMode: (condition: boolean) => void;
}

function NavMenu(props: NavMenuProps) {
  const { roleId, onHide } = props;
  const [isHidden, setHidden] = useState(false);
  const [isDark, setMode] = useState(true);

  const changeMode = () => {
    isDark ? setMode(false) : setMode(true);
    props.onShangeMode(isDark);
  };

  const changeHidden = () => {
    isHidden ? setHidden(false) : setHidden(true);
    props.onHide(isHidden);
  };

  const defaultShowFilter = (link: DropdownLinkParams) => {
    const groupInfo = groupsForNavMenu.find(
      (group) => group.id.toString() === link.routeParam
    );

    if (groupInfo?.showByDefault) return true;

    return false;
  };

  return (
    <div className="menu-container">
      <nav className={isHidden ? 'notshow' : 'vision'}>
        <NavMenuSimpleLink route="personal-page" faIcon="user" label="ЛК" />
        {(roleId === Role.Admin || roleId === Role.Manager) && (
          <NavMenuSimpleLink
            route="user-list"
            faIcon="user"
            label="Пользователи"
          />
        )}
        {[Role.Teacher, Role.Methodist, Role.Tutor, Role.Student].includes(
          roleId
        ) && (
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
        {roleId !== Role.Student && (
          <NavMenuSimpleLink route="tags-page" faIcon="tag" label="Тэги" />
        )}
        {roleId !== Role.Methodist && (
          <NavMenuDropdownLink
            route="group"
            faIcon="user"
            label="Группы"
            dropdownLinks={groupsForNavMenu.map((group) => ({
              label: group.name,
              routeParam: group.id.toString(),
            }))}
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
      <button
        className="mode round-button"
        onClick={changeMode}
        title={isDark ? 'ночной режим' : 'дневной режим'}>
        <FontAwesomeIcon icon={isDark ? 'moon' : 'sun'} />
      </button>
    </div>
  );
}

export default NavMenu;
