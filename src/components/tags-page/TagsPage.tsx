import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { isJSDocReturnTag } from 'typescript';
import { Tag } from '../interfaces/Tag';
import TagList from './tag-list/TagList';
import './TagsPage.css';
import wretch from 'wretch';
import { sendGetRequest, sendPostRequest } from '../../services/http.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchComponent from '../../shared/components/search-component/SearchComponent';
import AddTagModal from './add-tag-modal/AddTagModal';
import { responseHandlers } from '../../services/response-handler/responseHandler';
import { TagAddEnd, TagEnd, UserEnd } from '../../shared/endpointConsts';
import NotificationData from '../../shared/interfaces/NotificationData';

interface TagsPageProps {
    sendNotification: (newNotification: NotificationData | undefined) => void;
}

function TagsPage(props: TagsPageProps) {
    const url = 'Tag';
    const [tagsInState, setTagsInState] = useState<Tag[] | undefined>([]);
    const [searchTurn, setSearchTurn] = useState('');
    const [hidden, setHidden] = useState('hidden')

    const getTags = async () => {
        setTagsInState(await sendGetRequest<Tag[]>(url, props.sendNotification, responseHandlers[TagEnd]))
    };

    useEffect(() => {
        getTags();
    }, []);

    const tagsFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchTurn(e.target.value);
    };

    const closeModal = () => setHidden("hidden");

    return (
        <div className="main">
            <div className="column-head">
                <div className="input">
                    <input onChange={tagsFilter} />
                    <button className="button-style" onClick={() => { setHidden("") }}>
                        <FontAwesomeIcon icon="plus" />
                        <span> Добавить</span>
                    </button>
                </div>
            </div>

            <div className="body">
                <div className="tags-list"> <TagList str={searchTurn} tags={tagsInState} sendNotification={props.sendNotification} setTagsInState={setTagsInState}></TagList> </div>

            </div>
            <AddTagModal sendNotification={props.sendNotification} setTagsInState={setTagsInState} hidden={hidden} setHidden={closeModal} />
        </div>
    )


}

export default TagsPage



