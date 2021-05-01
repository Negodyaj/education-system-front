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
    min-height: 0px;
    width: max-content;
    border-bottom: 1px solid rgba(39, 45, 59, 0.15);
    border-radius: 20px;
    padding: 24px;
    & + & {
        margin-top: 10px;
    }
`;
export const CourseItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    height: 68px;
    align-content: center;
`
export const CourseName = styled.div`
    font-weight: 700;
`;
export const HomeworkItem = styled.div`
    height: 50px;
    display:grid;
    grid-template-columns: 410px 150px 100px max-content;
    border-bottom: 1px solid rgba(39, 45, 59, 0.15);
    padding-right: 3px;
`;
export const HomeworkProp = styled.div`
    display: flex;
    align-items: center;
`
export const HomeworkThemeName = styled.p`
    margin: 0;    
    display: flex;
    flex-direction: column;
    align-self: center;
`;