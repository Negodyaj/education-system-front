import styled from "styled-components";

export const HomeworkPageContainer = styled.div``;

export const HomeworkSelectorContainer = styled.div``;

export const CourseItem = styled.div`
    height: 158px;
`
export const CourseName = styled.div`
    font-weight: 700;
`
export const HomeworkItem = styled.div`
    height: 29px;
    display: flex;
    justify-content: start;
    
    & + & {
        margin-top: 10px;
    }
    
    & :first-child {
        width: 500px;
        border: 1px solid red;
    }

    & :nth-child(2) {
        border: 1px solid red;
    }
`