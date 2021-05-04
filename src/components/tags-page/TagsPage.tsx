import React, { ChangeEventHandler, useEffect, useState } from 'react';
import './TagsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddTagModal from './add-tag-modal/AddTagModal';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import TagList from './tag-list/TagList';
import { doFilteringTags, toggleModalHidden } from '../../store/tags-page/action-creators';
import { CommonButton } from '../../shared/styled-components/buttonStyledComponent';


function TagsPage() {
    const url = 'Tag';
    const [searchTurn, setSearchTurn] = useState('');
    const dispatch = useDispatch();
    const pageState = useSelector((state: IRootState) => state.tagsPage);

    const filterTags: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchTurn(e.target.value);
        dispatch(doFilteringTags(e.target.value));
    };


    return (
        <div className="main">
            <div className="tag-tittle"> <h4> Теги</h4> </div>
            <div className="tag-header">
                <input className="input-search" onChange={filterTags} placeholder="Поиск" /> <FontAwesomeIcon icon='search' />
                <CommonButton as="button" onClick={() => { dispatch(toggleModalHidden()) }}>
                    <FontAwesomeIcon icon="plus" />
                    <span> Добавить</span>
                </CommonButton>
            </div>

            <div className="body">
                <div className="tags-list"> <TagList str={searchTurn} ></TagList>
                    <AddTagModal hidden={pageState.isTagsModalHidden} />
                </div>
            </div>
        </div>
    )


}

export default TagsPage



