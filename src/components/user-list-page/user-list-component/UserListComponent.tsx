import { useWindowSize } from '../../../shared/hooks/useWindowSize';

import ListHeaderVerticalNarrow from './narrow/ListHeaderVerticalNarrow';
import UserListBodyVerticalNarrow from './narrow/UserListBodyVerticalNarrow';
import ListHeaderWide from './wide/ListHeaderWide';
import UserListBodyWide from './wide/UserListBodyWide';

function UserListComponent() {
  const mode = useWindowSize();

  return mode === 'desktop' ? (
    <div className="user-list">
      <ListHeaderWide />
      <UserListBodyWide />
    </div>
  ) : (
    <div className="narrow-user-list">
      <ListHeaderVerticalNarrow />
      <UserListBodyVerticalNarrow />
    </div>
  );
}
export default UserListComponent;
