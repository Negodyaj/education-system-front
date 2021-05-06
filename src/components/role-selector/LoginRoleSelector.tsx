import { useDispatch, useSelector } from "react-redux";
import { Role } from "../../enums/role";
import CustomMultiSelect from "../../shared/components/multi-select/CustomMultiSelect";
import { convertEntitiesToSelectItems } from "../../shared/converters/entityToSelectItemConverter";
import { convertEnumToDictionary, getRussianDictionary } from "../../shared/converters/enumToDictionaryEntity";
import { convertIdToSelectItem } from "../../shared/converters/roleIdToSelectItem";
import { IRootState } from "../../store";
import { setCurrentUserRoleId } from "../../store/role-selector/action-creator";
import './LoginRoleSelector.css';

export function LoginRoleSelector() {

    const dispatch = useDispatch()
    const appState = useSelector((state: IRootState) => state)
    const onSingleSelect = (roleId: number | null) => {
        dispatch(setCurrentUserRoleId(roleId || 0));
    }
    return (
        appState.roleSelector.isDataLoading
            ?
            <div>LOADING</div>
            :
            <div className="role-selector container">
                <div className="role-selector label">
                    <div>Выберите роль</div>
                </div>
                <div className="role-selector single-select">
                    <CustomMultiSelect
                        selectType="single"
                        onSingleSelect={onSingleSelect}
                        selectedOption={convertIdToSelectItem(appState.roleSelector.currentUserRoleId, convertEntitiesToSelectItems(
                            getRussianDictionary(
                                convertEnumToDictionary(Role))))}
                        options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(Role)
                            .filter(item => appState.roleSelector.currentUser?.roles.includes(item.id) && item))) || undefined}
                    ></CustomMultiSelect>
                </div>
            </div>
    )
}

export default LoginRoleSelector;