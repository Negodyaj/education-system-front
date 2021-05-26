import styled from 'styled-components';

export const HomeworkModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(45, 46, 48, 0.7);
  opacity: 0;
  animation-name: open-back;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  pointer-events: all;
`;

type ModalVisibility = { marginTop: boolean };

export const AddHomeworkModalContainer = styled.div`
  display: grid;
  grid-template-rows: 70px 1fr 50px;
  opacity: 0;
  width: 700px;
  height: 610px;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 20px;
  padding: 5px 5px;
  margin-top: -100%;
  background-color: rgb(255, 255, 255);
  animation-name: open-modal;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  position: absolute;
  ${(props: ModalVisibility) =>
    props.marginTop ? 'margin-top: 150 px' : 'margin-top: -100 vh'}
`;
