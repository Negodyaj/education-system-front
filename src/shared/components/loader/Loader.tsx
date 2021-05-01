import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { IRootState } from '../../../store';
import Spinner from './components/Spinner';

interface LoaderProps {
    active: boolean;
}

const Wrapper = styled.div<{ active: boolean }>`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    background: rgba(255, 255, 255, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.1s linear;
    opacity: ${props => +props.active };
    pointer-events: ${
        props => props.active ? "all" : "none"
    };
`;

const LoaderBox = styled.div`
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
`;

const LoadingText = styled.span`
    font-weight: 600;
    font-size: 26px;
`

const Loader = () => {
    return(
        <Wrapper active={!!useSelector((state: IRootState) => state.app.loadersCount)}>
            <LoaderBox>
                <Spinner color="#00CCF2" size={120}/>
                <LoadingText>Загрузка...</LoadingText>
            </LoaderBox>
        </Wrapper>
    )
}

export default Loader;