import styled from 'styled-components';

export const CourseContainer = styled.div`
  width: 900px;
  margin: 0 auto;
`;

export const CourseCreate = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 7px;
  margin-bottom: 30px;
`;

export const EmptyDiv = styled.div``;

export const CoursesList = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
`;

export const CourseStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  height: 60px;
  border-bottom: 1px solid rgba(39, 45, 59, 0.15);
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 400;

  &:hover {
    background-color: rgba(0, 211, 248, 0.15);
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const Loading = styled.div``;

export const CourseUpdateDelete = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90px;
  height: 40px;
`;
