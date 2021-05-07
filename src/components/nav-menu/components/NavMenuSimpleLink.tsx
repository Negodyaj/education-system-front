import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavMenuSimpleLinkProps {
  faIcon: IconProp;
  label: string;
  route: string;
}

function NavMenuSimpleLink(props: NavMenuSimpleLinkProps) {
  const { faIcon, label, route } = props;

  return (
    <NavLink to={`/${route}`} className="main-link" activeClassName="selected">
      <span className="icon-container">
        <FontAwesomeIcon icon={faIcon} />
      </span>
      <span className="text-container">{label}</span>
    </NavLink>
  );
}

export default NavMenuSimpleLink;
