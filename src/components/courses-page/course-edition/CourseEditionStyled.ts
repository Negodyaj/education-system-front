import styled from 'styled-components';

export const CourseEditionContainer = styled.div`
  display: grid;
  grid-template-rows: 70px 1fr;
  width: 1050px;
  margin: 0 auto;
`;

export const CourseNameHeader = styled.div`
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 20px;
  border-bottom: 1px solid rgba(39, 45, 59, 0.15);
  text-align: center;
  margin-bottom: 40px;
`;

export const CourseUpdate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
