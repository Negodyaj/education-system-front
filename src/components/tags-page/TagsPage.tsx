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
        setTagsInState (await sendGetRequest(url))
    };

    useEffect(() => {
        getTags();
    }, []);

    const anyTextInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        
    }

    return (

        <div className="table">
            <div className="header">
                <input className="search-bar"></input>
                <button className="add"></button>
            </div>
            <div className="body">
                <div className="tags"> <TagList tags={tagsInState}></TagList> </div>
            </div>
        </div>

    )


}

export default TagsPage