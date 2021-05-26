import styled from 'styled-components';
type ModalWindowVisibility = { isVisible?: boolean };
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
  display: ${(props: ModalWindowVisibility) =>
    props.isVisible ? `block` : `none`};
`;

export const ModalFormCreate = styled.div`
  display: grid;
  position: absolute;
  grid-template-rows: 50px 1fr;
  opacity: 1;
  border: 3px solid rgb(255, 255, 255);
  border-radius: 20px;
  padding: 35px 35px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  margin-left: 35%;
  margin-right: 65%;
  margin-top: 6%;

  & h4 {
    margin: 0;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: left;
`;

export const HeadModal = styled.div`
  display: flex;
  margin-left: 0;
  font-size: 20px;
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 30px;
  right: 25px;
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
  outline: none;
`;

export const FormWrapper = styled.div``;

export const SelectDelete = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 55px;
`;
