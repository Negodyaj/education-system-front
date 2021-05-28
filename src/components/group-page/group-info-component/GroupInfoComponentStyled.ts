import styled from 'styled-components';

export const GroupBody = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const GroupInfoContainer = styled.div``;

export const BaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  text-align: left;
  border-radius: 20px;
  box-shadow: 0 3px 6px #272d3b36;
  padding: 10px;
  margin-bottom: 15px;
  @media (max-width: 900px) {
    width: 200px;
  }
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  font-family: 'Montserrat';
  margin-bottom: 3px;
`;

export const Content = styled.div`
  border: none;
  display: flex;
  min-height: 30px;
`;

export const Member = styled.div`
  grid-template-columns: 60px 140px;
  margin: 2px 0;
  align-self: center;
  display: grid;
  min-height: 50px;
  text-align: left;
  font-size: 14px;
`;

export const Column = styled.div`
  display: flex;
  align-self: center;
  font-size: 14px;
  margin-bottom: 3px;
`;

export const GroupList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  border-radius: 20px;
  box-shadow: 0 3px 6px #272d3b36;
  padding: 10px;
  min-width: 200px;
`;

export const GroupMemberList = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  padding: 10px;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    min-width: 200px;
  }
`;
