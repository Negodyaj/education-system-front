import styled, { css } from "styled-components";
import img from './arrow.svg';

export const ChevronArrow = styled.div`
    height: 20px;
    width: 20px;
    padding: 0px;
    border: none;
    transform: rotateZ(270deg);
    transition: 0.2s;
    background-image: url(${img});
`