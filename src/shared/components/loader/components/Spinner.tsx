import styled, { keyframes } from 'styled-components';

const Spinner = (props: { color: string; size: number }) => {
  const { color, size } = props;
  const SpinnerContainer = styled.div`
    display: inline-block;
    position: relative;
    width: ${size}px;
    height: ${size}px;
  `;

  const rotate = keyframes`
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    `;

  const SpinnerElement = styled.div`
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${size * 0.8}px;
    height: ${size * 0.8}px;
    margin: ${size * 0.1}px;
    border: ${size * 0.1}px solid ${color};
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${color} transparent transparent transparent;
  `;

  const SpinnerElement1 = styled(SpinnerElement)`
    animation-delay: -0.45s;
  `;

  const SpinnerElement2 = styled(SpinnerElement)`
    animation-delay: -0.3s;
  `;

  const SpinnerElement3 = styled(SpinnerElement)`
    animation-delay: -0.15s;
  `;

  return (
    <SpinnerContainer>
      <SpinnerElement1 />
      <SpinnerElement2 />
      <SpinnerElement3 />
      <SpinnerElement />
    </SpinnerContainer>
  );
};

export default Spinner;
