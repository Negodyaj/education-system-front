import styled from 'styled-components';

export const LessonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px auto;
  width: 1200px;
`;

export const CreateLesson = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const AttendanceLesson = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: flex-end;
  align-items: center;
`;

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

export const CommonButton = styled(Button)`
  height: 40px;
  border-radius: 25px;
  min-width: 110px;
  font-size: 16px;
  font-weight: 600;
  padding: 0 25px;
`;
