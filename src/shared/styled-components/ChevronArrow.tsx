import styled, { css } from 'styled-components';

import img from '../../img/arrow.svg';

import { ACTIVE } from './consts';

export const ChevronArrow = styled.button`
  height: 20px;
  width: 20px;
  padding: 0px;
  border: none;

  transition: 0.32s;
  background-color: #fff;
  background-image: url(${img});
  ${(props) =>
    props.className === ACTIVE
      ? 'transform: rotateZ(90deg)'
      : 'transform: rotateZ(270deg)'}
`;
