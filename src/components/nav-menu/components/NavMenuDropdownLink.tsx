import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { NavMenuSimpleLinkProps } from "./NavMenuSimpleLink";

interface DropdownLinkParams {
    label: string,
    routeParam: string,
    showByDefault: boolean,
}

interface NavMenuDropdownLinkProps extends NavMenuSimpleLinkProps {
    dropdownLinks: DropdownLinkParams[],
}

function NavMenuDropdownLink(props: NavMenuDropdownLinkProps) {
    const [isFullyOpen, setIsFullyOpen] = useState(false);
    const toggleFullyOpen = () => {
        setIsFullyOpen(!isFullyOpen);
    }

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
                            (isFullyOpen ?
                                props.dropdownLinks :
                                props.dropdownLinks.filter(link => link.showByDefault)
                            ).map(link => {
                                return (
                                    <li><NavLink to={`/${props.route}/${link.routeParam}`} className="dropdown-link" activeClassName="selected">
                                        <span className="text-container">{link.label}</span>
                                    </NavLink></li>
                                )
                            })
                        }
                        <span className="more-links-toggle" onClick={toggleFullyOpen}>{
                            isFullyOpen ? "скрыть" : "показать все"
                        }</span>
                    </ul>
                    
                </Route>
            </Switch>
        </div>
    )
}

export default NavMenuDropdownLink;