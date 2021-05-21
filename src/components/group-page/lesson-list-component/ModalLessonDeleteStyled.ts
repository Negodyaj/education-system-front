import styled from 'styled-components';

export const ModalBackDeleteLesson = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
  pointer-events: all;
`;

export const ModalDeleteLesson = styled.div`
  display: grid;
  grid-template-rows: 70px 1fr 50px;
  margin: 0 auto;
  width: 500px;
  height: 250px;
  border-radius: 20px;
  padding: 5px 5px;
  margin-top: 15%;
  background-color: rgb(255, 255, 255);
  position: relative;
  opacity: 1;
`;

export const ModalHeaderDeleteLesson = styled.div`
  position: relative;
`;

export const ModalContentDeleteLesson = styled.div`
  padding: 0 30px;
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 600;
  text-align: center;
`;

export const ModalBottomDeleteLesson = styled.div`
  display: flex;
  justify-content: space-around;
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

export const ButtonCloseModalDeleteLesson = styled(RoundButton)`
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
