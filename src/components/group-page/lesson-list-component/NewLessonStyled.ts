import styled from 'styled-components';

export const ModalBackLesson = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(45, 46, 48, 0.7);
  opacity: 1;
  transition: all 0.6s easy;
  pointer-events: all;
`;

export const ModalAddLesson = styled.div`
  display: grid;
  grid-template-rows: 70px 1fr 50px;
  opacity: 1;
  width: 500px;
  height: 610px;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 20px;
  padding: 5px 5px;
  background-color: rgb(255, 255, 255);
  transition: all 0.6s easy;
  position: relative;
  margin: 0 auto;
  margin-top: 6%;
`;

export const ModalHeaderAddLesson = styled.div`
  position: relative;
`;

export const HeadModalLesson = styled.div`
  display: flex;
  padding-left: 15px;
  font-size: 20px;
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

export const ButtonCloseModalAddLesson = styled(RoundButton)`
  position: absolute;
  top: 5px;
  right: 5px;

  &:focus {
    border: none;
    outline: none;
  }
`;

export const CommonButton = styled(Button)`
  height: 40px;
  border-radius: 25px;
  min-width: 110px;
  font-size: 16px;
  font-weight: 600;
  padding: 0 25px;
`;

export const InputStyle = styled.form`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  outline: none;
`;

export const FormWrapper = styled.div``;

export const SelectAddLessonOrCancel = styled.div`
  display: flex;
  justify-content: space-around;
  height: 55px;
`;
