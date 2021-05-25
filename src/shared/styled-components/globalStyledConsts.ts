import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

type WidthText = { width?: number };
type WidthTextarea = { width?: number };
type WidthNumberInput = { width?: number };

export const ACTIVE = 'is-active';
export const NOT_ACTIVE = '';

export const PageTitle = styled.div`
  margin: 0px;
  font-size: 26px;
`;
export const ButtonsCell = styled.div`
  width: max-content;
  display: flex;
  flex-direction: row;
  align-self: center;
`;

export const TextareaInput = styled.textarea`
  width: 272px;
  height: 40px;
  border: 1px solid #e0e7ff;
  border-radius: 5px;
  margin-bottom: 11px;
  outline: none;
  font-size: 14px;
  padding: 0 13px;
  font-weight: 400;
`;

export const TextareaStyled = styled(TextareaInput)`
  min-height: 200px;
  max-height: 200px;
  min-width: ${(props: WidthTextarea) =>
    props.width ? `${props.width}px` : '272px'};
  max-width: ${(props: WidthTextarea) =>
    props.width ? `${props.width}px` : '272px'};
`;

const InputStyledBase = styled.input`
  height: 40px;
  width: 272px;
  border: 1px solid #e0e7ff;
  border-radius: 5px;
  margin-bottom: 11px;
  outline: none;
  font-size: 14px;
  padding: 0 13px;
  font-weight: 400;
`;

export const NumberInputStyled = styled(InputStyledBase)`
  width: ${(props: WidthNumberInput) =>
    props.width ? `${props.width}px` : '272px'};
`;

export const InputText = styled(InputStyledBase)`
  width: ${(props: WidthText) => (props.width ? `${props.width}px` : '272px')};
`;

export const LinkStyledRegularFont = styled(Link)`
  text-decoration: none;
  color: var(--main-color);
`;
