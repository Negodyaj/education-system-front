import styled from 'styled-components';

export const ProgramCourseContainer = styled.div`
  display: grid;
  grid-template-rows: 60px 1fr;
`;

export const ProgramCourseHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
  align-items: center;
  height: 40px;
  border-radius: 20px;
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const ProgramCourseHeaderText = styled.div`
  margin-left: 15px;
`;

export const ProgramCourseContent = styled.div`
  display: grid;
  grid-template-columns: 350px 600px;
  gap: 100px;
  margin-top: 30px;
`;
