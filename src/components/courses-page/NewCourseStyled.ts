import styled from 'styled-components';

export const ModalBackground = styled.div`
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

export const ModalAddCourse = styled.div`
  display: grid;
  grid-template-rows: 70px 1fr 50px;
  opacity: 1;
  width: 600px;
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

export const ModalHeaderAddCourse = styled.div`
  position: relative;
`;

export const HeadModal = styled.div`
  display: flex;
  margin-left: 115px;
  padding-top: 15px;
  font-size: 20px;
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 50%;
  background-color: #00ccf2;
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  color: white;

  &:focus {
    border: none;
    outline: none;
  }
`;

export const InputStyle = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  outline: none;
`;

export const FormWrapper = styled.div``;

export const SelectDelete = styled.div`
  display: flex;
  justify-content: space-around;
  height: 55px;
`;
