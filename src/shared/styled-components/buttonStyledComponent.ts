import styled from "styled-components";

export const Button = styled.button`
    background-color: #00ccf2;
    color: #ffff;
    border: none;
    text-align: center;
    outline: none;
    cursor: pointer;
    & + & {margin-left: 10px};
    &:hover {
        transition: 0.32s;
        background-color: #2D62ED;
    }
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

export const DisabledButton = styled(CommonButton)<{disabled:boolean}>`
opacity: ${props=>props.disabled? "0.2":"1"} 
`;