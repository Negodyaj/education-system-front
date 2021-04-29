import styled from 'styled-components';
import Spinner from './components/Spinner';

const Loader = () => {
    const Wrapper = styled.div`
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        background: rgba(255, 255, 255, .5);
        display: flex;
        justify-content: center;
        align-items: center;
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

    return(
        <Wrapper>
            <LoaderBox>
                <Spinner color="#00CCF2" size={120}/>
                <LoadingText>Загрузка...</LoadingText>
            </LoaderBox>
        </Wrapper>
    )
}

export default Loader;