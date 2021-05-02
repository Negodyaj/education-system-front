import styled from "styled-components";

export const ModalAttendanceBack = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    pointer-events: all;
`

export const ModalAttendanceContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 70px 1fr 100px;
    width: 500px;
    border-radius: 20px;
    padding: 5px 5px;
    margin: 100px auto;
    background-color: rgb(255, 255, 255);
    position: relative;
`

export const ModalAttendanceHeader = styled.div`
    display: flex;
    align-items: center;
    padding-left: 50px;
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 20px;
`

export const UserListAttendanceByGroup = styled.div`
    display: flex;
    flex-direction: column; 
    width: 90%;
    margin: 0 auto;
`

export const UserAttendance = styled.div`
    display: grid;
    grid-template-columns: 75% 25%; 
    font-family: 'Montserrat';
    font-weight: 400;
    border-bottom: 1px solid rgba(39, 45, 59, .15);
    height: 35px;
`

export const UserDataForAttendance = styled.div`
    display: flex;
    align-items: center;
`

export const UserAttendanceSelect = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SaveUsersAttendance = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 95%;
`

export const Button = styled.button`
    background-color: #00ccf2;
    color: #ffff;
    border: none;
    text-align: center;
    outline: none;
    cursor: pointer;
`

export const RoundButton = styled(Button)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    right: 5px;
`

export const CommonButton = styled(Button)`
    height: 40px;
    border-radius: 25px;
    min-width: 110px;
    font-size: 16px;
    font-weight: 600;
    padding: 0 25px;
`


export const CheckBoxWrapper = styled.div`
  position: relative;

`

export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 5px;
  left: 0;
  width: 42px;
  height: 24px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`