import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { isJSDocReturnTag } from 'typescript';
import { Tag } from '../interfaces/Tag';
import TagList from './tag-list/TagList';
import './TagsPage.css';
import wretch from 'wretch';
import { sendGetRequest } from '../../services/http.service';


function TagsPage() {
    const url = 'Tag';
    const [tagsInState, setTagsInState] = useState<Tag[]>([]);
    const getTags = async () => {
        setTagsInState (await sendGetRequest<Tag[]>(url))
    };

    useEffect(() => {
        getTags();
    }, []);

    const tagsFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCopyTagsInState (tagsInState.concat());
         console.log(copyTagsInState)
        setCopyTagsInState(copyTagsInState.filter(t => { if (t.name === e.target.value) { return t } }))
    
    };

    return (

        <div className="table">
            <div className="header">
                <input className="search-bar" onChange={tagsFilter} ></input>
                <button className="add"></button>
            </div>
            <div className="body">
                <div className="tags"> <TagList tags={copyTagsInState}></TagList> </div>
            </div>
        </div>

    )


}

export default TagsPage