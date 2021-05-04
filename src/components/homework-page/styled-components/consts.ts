import styled from "styled-components";
import { ACTIVE, NOT_ACTIVE } from "../../../shared/styled-components/consts";
export const HomeworkPageContainer = styled.div`
    font-size: 14px;
`;
export const HomeworkPageHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const HomeworkSelectorContainer = styled.div``;
export const HomeworkItemsSet = styled.div`
min-height: 0px;
overflow: hidden;
width: max-content;
border-bottom: 1px solid rgba(39, 45, 59, 0.15);
border-radius: 20px;
padding: 24px;
transition: 0.52s;
& + & {
    margin-top: 10px;
}
${props => props.className === ACTIVE ? "max-height: 500px" : "max-height: 20px"}
`;
//export const HomeworkItemsSet = styled(HomeworkItemsGroup)``;
//export const GroupItem = styled(HomeworkItemsGroup)``;
export const HomeworkItemsSetHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    height: 68px;
    align-content: center;
`
export const ItemsSetName = styled.div`
    font-weight: 700;
`;
export const HomeworkItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(39, 45, 59, 0.15);
    padding-right: 3px;
    overflow: hidden;
`;
type DescriptionVisibility = { descriptionVisibility: boolean };
export const HomeworkItemHeader = styled.div`
    min-height: 50px;
    display:grid;
    grid-template-columns: 410px 150px 100px max-content;
    &:hover {
        background-color: rgba(0, 211, 248, 0.15);
        cursor: pointer;
    }
    & ~ * {
        transition: 0.32s;
        ${(props: DescriptionVisibility) => props.descriptionVisibility ? "max-height: max-content; padding: 12px;" : "max-height: 0px; padding-left: 12px;"}
    }
    
`;
export const HomeworkDescription = styled.div.attrs({
    className: "homework-description"
})`
`;
export const HomeworkProp = styled.div`
    display: flex;
    align-items: center;
`
export const HomeworkName = styled(HomeworkProp)`
    font-weight: 700;
`
export const HomeworkThemeName = styled.p`
    margin: 0;    
    display: flex;
    flex-direction: column;
    align-self: center;
`;