import styled, { css } from 'styled-components';

export const LessonsContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const LessonsTable = styled.div`
    display: grid;
    grid-template-columns: 10% 30% 20% 20% 20%;
    width: 1200px;
`

export const ColumnHeaderLessonsTable = styled.div`
    display: flex;
    justify-content: center;
    font-family: 'Montserrat';
    font-weight: 600;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
`