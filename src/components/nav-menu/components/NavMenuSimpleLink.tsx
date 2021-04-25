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
        <NavLink to={"/"+props.route}>
            <div className="icon-container"><FontAwesomeIcon icon={props.faIcon} /></div>
            <div className="label-container">{props.label}</div>
        </NavLink>
    )
}

export default NavMenuSimpleLink;