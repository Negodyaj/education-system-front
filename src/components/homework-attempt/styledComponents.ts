import styled from 'styled-components';
export const AttemptCheckingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Header = styled.div`
  margin-bottom: 9px;
`;
export const GroupName = styled.p`
  font-size: 14px;
  display: flex;
  flex-direction: raw;
  align-items: baseline;
`;
export const Title = styled.span`
  font-weight: 700;
  padding-right: 15px;
`;
export const Data = styled.span``;
export const Description = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
`;
export const NavPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 281px;
`;
export const Author = styled.a`
  display: flex;
  align-items: center;
  height: 40px;
  width: 270px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background-color: #2d62ed;
    color: white;
  }
  ${(props: { isViewing: boolean }) =>
    props.isViewing && 'background-color: #00ccf2; color: white;'}
`;
export const UserPic = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin-right: 12px;
  margin-left: 5px;
  margin-top: 8px;
`;
export const Content = styled.div``;
