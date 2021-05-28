import styled from 'styled-components';
export const AttemptCheckingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
`;
export const AttemptCheckingRow = styled.div`
  display: flex;
  flex-direction: row;
  ${(props: { right?: boolean }) => props.right && 'justify-content: flex-end;'}
  & form {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  & form button {
    margin-left: 25px;
    margin-bottom: 5px;
  }
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
  background-color: #f4f7fe;
`;
export const Author = styled.a`
  display: flex;
  align-items: center;
  height: 50px;
  width: 281px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    background-color: #2d62ed;
    color: white;
  }
  & + & {
    margin-top: 30px;
  }
  ${(props: { isViewing: boolean }) =>
    props.isViewing && 'background-color: #00ccf2; color: white;'}
`;
export const UserPic = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 12px;
  margin-left: 5px;
  margin-top: 8px;
`;
export const Content = styled.div`
  padding: 25px;
`;
