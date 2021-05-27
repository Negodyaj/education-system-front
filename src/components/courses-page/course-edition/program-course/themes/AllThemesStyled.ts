import styled from 'styled-components';

export const ThemesContainer = styled.div`
  display: grid;
  grid-template-rows: 60px 1fr;
`;

export const AllThemesHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 90px;
`;

export const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

export const ThemesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 500px;
  overflow: auto;
`;

export const ThemePosition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  width: 350px;
  min-height: 50px;
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 16px;
  border-bottom: 1px solid rgba(39, 45, 59, 0.15);
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 211, 248, 0.15);
    border-radius: 5px;
  }
  &:focus {
    background-color: rgba(0, 211, 248, 0.15);
    border-radius: 5px;
  }
`;

export const ThemePositionName = styled.div``;

export const AddingNewThemeInCourse = styled.div``;

export const ButtonAddingNewThemeInCourse = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0);
  background-size: contain;
  width: 32px;
  height: 32px;
  outline: none;
  border: none;
  cursor: pointer;
`;
