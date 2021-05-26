import styled from 'styled-components';

export const CourseThemesContainer = styled.div`
  width: 600px;
`;

export const CourseThemePosition = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  width: inherit;
  height: 50px;
  border-bottom: 1px solid rgba(39, 45, 59, 0.15);
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 16px;
  &:hover {
    background-color: rgba(0, 211, 248, 0.15);
    border-radius: 5px;
  }
`;

export const CourseThemeName = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  align-items: center;
`;

export const CourseThemeDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonDeleteThemeFromCourse = styled.div`
  background-color: rgba(255, 255, 255, 0);
  background-size: contain;
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const TextForHeaders = styled.div`
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
