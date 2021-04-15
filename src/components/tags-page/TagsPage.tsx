import React, { ChangeEventHandler, useEffect, useState } from 'react';
import './TagsPage.css';
import { sendGetRequest, sendPostRequest } from '../../services/http.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddTagModal from './add-tag-modal/AddTagModal';
import { Tag } from '../../interfaces/Tag';
import TagList from './tag-list/TagList';
import { isTagArr } from '../../services/type-guards/tagArr';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../../store/tags-page/thunk';
import { IRootState } from '../../store';

interface TagsPageProps {
}

function TagsPage(props: TagsPageProps) {
    const url = 'Tag';
    const [tagsInState, setTagsInState] = useState<Tag[] | undefined>([]);
    const [searchTurn, setSearchTurn] = useState('');
    const [hidden, setHidden] = useState('hidden')
    

    const filterTags: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchTurn(e.target.value);
    };

    const closeModal = () => setHidden("hidden");

    return (
        <div className="main">
            <div className="tag-tittle"> <h4> Теги</h4> </div>
            <div className="tag-header">
                <input className="input-search" onChange={filterTags} placeholder="Поиск" /> <FontAwesomeIcon icon='search' />
                <button className="button-style" onClick={() => { setHidden("") }}>
                    <FontAwesomeIcon icon="plus" />
                    <span> Добавить</span>
                </button>
            </div>
            
            <div className="body">
                <div className="tags-list"> <TagList str={searchTurn} tags={tagsInState} setTagsInState={setTagsInState}></TagList> </div>

            </div>
            <AddTagModal setTagsInState={setTagsInState} hidden={hidden} setHidden={closeModal} />
        </div>
    )


}

export default TagsPage



