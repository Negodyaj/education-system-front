import styled from 'styled-components';

export const CourseMaterialsContainer = styled.div`
  width: 600px;
`;

export const CourseMaterialPosition = styled.div`
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

export const ContentCurrentMaterial = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

export const LinkOnMaterial = styled.a`
  text-decoration: none;
  color: black;
`;

export const CourseMaterialDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonDeleteMaterialFromCourse = styled.button`
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
