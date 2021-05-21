import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import { NavMenuSimpleLinkProps } from './NavMenuSimpleLink';

export interface DropdownLinkParams {
  label: string;
  routeParam: string;
}

interface NavMenuDropdownLinkProps extends NavMenuSimpleLinkProps {
  dropdownLinks: DropdownLinkParams[];
  alwaysShowAll: boolean;
  defaultShowFilter?: (link: DropdownLinkParams) => boolean;
}

function NavMenuDropdownLink(props: NavMenuDropdownLinkProps) {
  const {
    dropdownLinks,
    alwaysShowAll,
    defaultShowFilter,
    faIcon,
    label,
    route,
  } = props;
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const toggleFullyOpen = () => {
    setIsFullyOpen(!isFullyOpen);
  };

  useEffect(() => {
    if (alwaysShowAll) toggleFullyOpen();
  }, []);

  return (
    <div>
      <NavLink
        to={`/${route}`}
        className="main-link"
        activeClassName="selected">
        <span className="icon-container">
          <FontAwesomeIcon icon={faIcon} />
        </span>
        <span className="text-container">{label}</span>
      </NavLink>
      <Switch>
        <Route path={`/${route}`}>
          <ul className="dropdown-link-container">
            {(isFullyOpen || defaultShowFilter === undefined
              ? dropdownLinks
              : dropdownLinks.filter(defaultShowFilter)
            ).map((link) => (
              <li>
                <NavLink
                  to={`/${route}/${link.routeParam}`}
                  className="dropdown-link"
                  activeClassName="selected">
                  <span className="text-container">{link.label}</span>
                </NavLink>
              </li>
            ))}
            {!alwaysShowAll && (
              <span
                role="button"
                tabIndex={0}
                onClick={toggleFullyOpen}
                onKeyPress={toggleFullyOpen}
                className="more-links-toggle">
                {isFullyOpen ? 'скрыть' : 'показать все'}
              </span>
            )}
          </ul>
        </Route>
      </Switch>
    </div>
  );
}

export default NavMenuDropdownLink;
