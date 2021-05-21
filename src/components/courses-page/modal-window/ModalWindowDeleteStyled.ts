import styled from 'styled-components';

export const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
  pointer-events: all;
`;

export const Modal = styled.div`
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

export const ModalHeaderCourseDelete = styled.div`
  position: relative;
`;

export const ModalContentCourseDelete = styled.div`
  margin-left: 40px;
  padding: 0 30px;
  font-size: 20px;
  font-family: 'Montserrat';
  font-weight: 600;
`;

export const ModalButtomCourseDelete = styled.div`
  display: flex;
  justify-content: space-around;
`;
