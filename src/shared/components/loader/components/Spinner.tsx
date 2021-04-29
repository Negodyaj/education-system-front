import styled, { keyframes } from "styled-components";

const Spinner = (
    props: {
        color: string,
        size: number,
    }
) => {
    const SpinnerContainer = styled.div`
        display: inline-block;
        position: relative;
        width: ${props.size}px;
        height: ${props.size}px;
    `;

    const rotate = keyframes`
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    `    

    const SpinnerElement = styled.div`
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: ${props.size * 0.8}px;
        height: ${props.size * 0.8}px;
        margin: ${props.size * 0.1}px;
        border: ${props.size * 0.1}px solid ${props.color};
        border-radius: 50%;
        animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${props.color} transparent transparent transparent;
    `;

    const SpinnerElement1 = styled(SpinnerElement)`
        animation-delay: -0.45s;
    `

    const SpinnerElement2 = styled(SpinnerElement)`
        animation-delay: -0.3s;
    `

    const SpinnerElement3 = styled(SpinnerElement)`
        animation-delay: -0.15s;
    `

    return (
        <SpinnerContainer>
            <SpinnerElement1></SpinnerElement1>
            <SpinnerElement2></SpinnerElement2>
            <SpinnerElement3></SpinnerElement3>
            <SpinnerElement></SpinnerElement>
        </SpinnerContainer>
    )
}

export default Spinner;