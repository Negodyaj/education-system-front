import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UNSELECTED_ROLE } from "../../shared/consts";
import { convertRoleIdsToSelectItem } from "../../shared/converters/roleIdsToSelectItem";
import { IRootState } from "../../store";
import { setIsLoggedIn } from "../../store/app/action-creators";
import { closeRoleSelector, setCurrentUserRoleId } from "../../store/role-selector/action-creator";
import { getCurrentUser } from "../../store/role-selector/thunk";
import CustomMultiSelect from "../multi-select/CustomMultiSelect";
import './LoginRoleSelector.css';

export function LoginRoleSelector() {

    const dispatch = useDispatch()
    const roleSelectorState = useSelector((state: IRootState) => state)

    useEffect(() => {
        dispatch(getCurrentUser())
    }, []
    )

    const onSingleSelect = (roleId: number | null) => dispatch(setCurrentUserRoleId(roleId || UNSELECTED_ROLE))
    const login = () => {
        dispatch(setIsLoggedIn())
        dispatch(closeRoleSelector())
    }

    return (
        <div className="role-selector page">
            <div className="role-selector container">
                <div className="role-selector action">
                    <div>Выберите роль</div>
                </div>
                <CustomMultiSelect
                    selectType="single"
                    onSingleSelect={onSingleSelect}
                    options={convertRoleIdsToSelectItem(roleSelectorState.roleSelector.currentUser?.roles) || undefined}
                ></CustomMultiSelect>
                <div className={"role-selector select-btn-container " + roleSelectorState.roleSelector.continueButtonVisibility}>
                    <button className="button-style" onClick={login}>Продолжить</button>
                </div>
            </div>
        </div>
    )
}

export default LoginRoleSelector;