import { HomeworkPageOptions } from "../HomeworkPageCore"
import { Role } from "../../../enums/role"
import React from "react"
import { ACTIVE, NOT_ACTIVE } from "../../../shared/styled-components/consts"
import { IRootState } from "../../../store"
import { HomeworkItemsSet, HomeworkItemsSetHeader, HomeworkSelectorContainer, ItemsSetName } from '../styled-components/consts'
import HomeworkItemBody from '../HomeworkItem/HomeworkItemBody'
import OpenItemsSetButton from './buttons/OpenItemsSetButton'
import { useSelector } from 'react-redux'

export function HomeworkSelector(props: {
    settings: HomeworkPageOptions
}) {
    const appState = useSelector((state: IRootState) => state);
    return (
        <HomeworkSelectorContainer>
            {
                Object.keys(appState.homeworkPage.pageOptionsByRole[Role[appState.roleSelector.currentUserRoleId]].homeworkList).map(itemsSetName =>
                    <HomeworkItemsSet className={appState.homeworkPage.openedItemSetsNames.includes(itemsSetName) ? ACTIVE : NOT_ACTIVE}>
                        <HomeworkItemsSetHeader>
                            <ItemsSetName>{itemsSetName}</ItemsSetName>
                            <OpenItemsSetButton itemsSetName={itemsSetName} />
                        </HomeworkItemsSetHeader>
                        {
                            (appState.homeworkPage.pageOptionsByRole[Role[appState.roleSelector.currentUserRoleId]].homeworkList)[itemsSetName].map(hw => (
                                <HomeworkItemBody hw={hw} buttons={props.settings.homeworkButtonsCell} />
                            ))
                        }
                    </HomeworkItemsSet>
                )
            }
        </HomeworkSelectorContainer>
    )
}