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
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const toggleFullyOpen = () => {
    setIsFullyOpen(!isFullyOpen);
  };

  useEffect(() => {
    if (props.alwaysShowAll) toggleFullyOpen();
  }, []);

  return (
    <div>
      <NavLink to={`/${props.route}`} className="main-link" activeClassName="selected">
        <span className="icon-container"><FontAwesomeIcon icon={props.faIcon} /></span>
        <span className="text-container">{props.label}</span>
      </NavLink>
      <Switch>
        <Route path={`/${props.route}`}>
          <ul className="dropdown-link-container">
            {
              (isFullyOpen || (props.defaultShowFilter === undefined) ?
                props.dropdownLinks
                : props.dropdownLinks.filter(props.defaultShowFilter)
              ).map((link) => {
                return (
                  <li><NavLink to={`/${props.route}/${link.routeParam}`} className="dropdown-link" activeClassName="selected">
                    <span className="text-container">{link.label}</span>
                  </NavLink>
                  </li>
                );
              })}
            {
              (!props.alwaysShowAll) &&
              <span className="more-links-toggle" onClick={toggleFullyOpen}>
                {isFullyOpen ? 'скрыть' : 'показать все'}
              </span>
            }
          </ul>
        </Route>
      </Switch>
    </div>
  );
}

export default NavMenuDropdownLink;
