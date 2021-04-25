import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavMenuSimpleLinkProps } from "./NavMenuSimpleLink";

interface DropdownLinkParams {
    label: string,
    route: string,
    showByDefault: boolean,
}

interface NavMenuDropdownLinkProps extends NavMenuSimpleLinkProps{
    dropdownLinks: DropdownLinkParams[],
}

function NavMenuDropdownLink (props: NavMenuDropdownLinkProps) {
    const [isFullyOpen, setIsFullyOpen] = useState(false);

    return (
        <div>
            <NavLink to={"/"+props.route} className="main-link" activeClassName="selected">
                <span className="icon-container"><FontAwesomeIcon icon={props.faIcon} /></span>
                <span className="label-container">{props.label}</span>
            </NavLink>
            <ul className="dropdown-link-container">
            {
                (isFullyOpen ? 
                    props.dropdownLinks :
                    props.dropdownLinks.filter(link => link.showByDefault)
                ).map(link => {
                    return(
                        <li><NavLink to={"/"+link.route} className="dropdown-link" activeClassName="selected">
                            <span className="label-container">{link.label}</span>
                        </NavLink></li>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default NavMenuDropdownLink;