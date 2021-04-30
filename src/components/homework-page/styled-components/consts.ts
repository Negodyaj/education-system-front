import styled from "styled-components";
export const HomeworkPageContainer = styled.div`
    font-size: 14px;
`;
export const HomeworkPageHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const HomeworkSelectorContainer = styled.div``;
export const CourseItem = styled.div`
    height: 158px;
`;
export const CourseName = styled.div`
    font-weight: 700;
`;
export const HomeworkItem = styled.div`
    height: 29px;
    
    & + & {
        margin-top: 10px;
    }
    
    & :nth-child(2) {
        display: flex;
        flex-direction: column;
    }

    display:grid;
    grid-template-columns: 500px 200px 100px 100px 100px;
`;
export const HomeworkThemeName = styled.p`
    margin: 0;

    & + & {
        margin-top: 5px;
    }
`;