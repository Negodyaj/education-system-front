import styled, { css } from 'styled-components';

export const LessonsTable = styled.div`
  display: grid;
  grid-template-rows: 25px 1fr;
  margin: 50px 0;
`;

export const HeaderLessonsTable = styled.div`
  display: grid;
  grid-template-columns: 10% 25% 25% 25% 15%;
  border-bottom: 1px solid rgba(39, 45, 59, 0.15);
`;

export const HeaderColumnLessonsTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-family: 'Montserrat';
  font-weight: 600;
`;

export const ContentColumnLessonsTable = styled.div`
  display: grid;
  grid-template-columns: 10% 25% 25% 25% 15%;
  border-bottom: 1px solid rgba(39, 45, 59, 0.15);
`;

export const ColumnLessonsTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-family: 'Montserrat';
  font-weight: 400;
  height: 60px;
`;

export const ButtonActions = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-end;
    gap: 10px;
`

export const Button = styled.button`
  background-color: #00ccf2;
  color: #ffff;
  border: none;
  text-align: center;
  outline: none;
  cursor: pointer;
`;

export const RoundButton = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
