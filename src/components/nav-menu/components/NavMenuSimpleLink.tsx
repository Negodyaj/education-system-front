import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";

interface NavMenuSimpleLinkProps {
    route: string,
    faIcon: IconProp,
    label: string,
}

function NavMenuSimpleLink (props: NavMenuSimpleLinkProps) {
    return (
        <NavLink to={`/${props.route}`} activeClassName="selected">
            <span className="icon-container"><FontAwesomeIcon icon={props.faIcon} /></span>
            <span className="label-container">{props.label}</span>
        </NavLink>
    )
}

export default NavMenuSimpleLink;