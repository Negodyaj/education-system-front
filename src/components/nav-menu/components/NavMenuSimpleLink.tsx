import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

export interface NavMenuSimpleLinkProps {
    faIcon: IconProp,
    label: string,
    route: string,
}

function NavMenuSimpleLink (props: NavMenuSimpleLinkProps) {
    return (
        <NavLink to={`/${props.route}`} className="main-link" activeClassName="selected">
            <span className="icon-container"><FontAwesomeIcon icon={props.faIcon} /></span>
            <span className="text-container">{props.label}</span>
        </NavLink>
    )
}

export default NavMenuSimpleLink;