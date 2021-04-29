import styled, { css } from 'styled-components';

export const LessonsContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const LessonsTable = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr;
    width: 1200px;
`

export const HeaderLessonsTable = styled.div`
    display: grid;
    grid-template-columns: 10% 30% 20% 20% 20%;
`

export const HeaderColumnLessonsTable = styled.div`
    display: flex;
    justify-content: center;
    font-family: 'Montserrat';
    font-weight: 600;
`

export const ContentColumnLessonsTable = styled.div`
    display: grid;
    grid-template-columns: 10% 30% 20% 20% 20%;
`

export const ColumnLessonsTable = styled.div`
    display: flex;
    justify-content: center;
    font-family: 'Montserrat';
    font-weight: 400;
    height: 40px;
`