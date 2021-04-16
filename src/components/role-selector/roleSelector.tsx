import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertRoleIdsToSelectItem } from "../../shared/converters/roleIdsToSelectItem";
import { IRootState } from "../../store";
import { setCurrentUserRoleId } from "../../store/app/action-creators";
import { getCurrentUser } from "../../store/role-selector/thunk";
import CustomMultiSelect from "../multi-select/CustomMultiSelect";

export function RoleSelector() {

    const dispatch = useDispatch()
    const roleSelectorState = useSelector((state: IRootState) => state)

    useEffect(() => {
        dispatch(getCurrentUser())
    }, []
    )

    const onSingleSelect = (roleId: number | null) => {
        dispatch(setCurrentUserRoleId(roleId || 0))
    }

    return (
        <CustomMultiSelect
            selectType="single"
            onSingleSelect={onSingleSelect}
            options={convertRoleIdsToSelectItem(roleSelectorState.roleSelector.currentUser?.roles) || undefined}
        ></CustomMultiSelect>
    )
}

export default RoleSelector;