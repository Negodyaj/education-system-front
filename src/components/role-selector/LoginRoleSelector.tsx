import { useDispatch, useSelector } from 'react-redux';

import CustomMultiSelect from '../../shared/components/multi-select/CustomMultiSelect';
import { convertRoleIdsToSelectItems } from '../../shared/converters/roleIdsToSelectItems';
import { convertRoleIdToSelectItem } from '../../shared/converters/roleIdToSelectItem';
import { IRootState } from '../../store';
import { setCurrentUserRoleId } from '../../store/role-selector/action-creator';
import './LoginRoleSelector.css';

export function LoginRoleSelector() {
  const dispatch = useDispatch();
  const appState = useSelector((state: IRootState) => state);

  const onSingleSelect = (roleId: number | null) => {
    dispatch(setCurrentUserRoleId(roleId || 0));
  };

  return appState.roleSelector.isDataLoading ? (
    <div>LOADING</div>
  ) : (
    <div className="role-selector container">
      <div className="role-selector label">
        <div>Выберите роль</div>
      </div>
      <div className="role-selector single-select">
        <CustomMultiSelect
          selectType="single"
          onSingleSelect={onSingleSelect}
          selectedOption={convertRoleIdToSelectItem(
            appState.roleSelector.currentUserRoleId
          )}
          options={
            convertRoleIdsToSelectItems(
              appState.roleSelector.currentUser?.roles
            ) || undefined
          }
      </div>
    </div>
  );
}

export default LoginRoleSelector;
