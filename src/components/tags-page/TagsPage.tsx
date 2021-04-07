import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { isJSDocReturnTag } from 'typescript';
import { Tag } from '../interfaces/Tag';
import TagList from './tag-list/TagList';
import './TagsPage.css';
import wretch from 'wretch';
import { sendGetRequest } from '../../services/http.service';


function TagsPage() {
    const url = 'Tag';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIiwi0J_RgNC10L_QvtC00LDQstCw0YLQtdC70YwiLCLQnNC10L3QtdC00LbQtdGAIl0sIm5iZiI6MTYxNzc5MjQwMCwiZXhwIjoxNjE3OTY1MjAwLCJpc3MiOiJFZHVjYXRpb25TeXN0ZW0uQXBpIiwiYXVkIjoiRGV2RWR1Y2F0aW9uIn0.47t-Gdx8tjCLY2CRrO3pxU-OeyAzWFwNJdyAloYZLUI';
    const [tagsInState, setTagsInState] = useState<any>();
    const getTags = async () => {
        setTagsInState (await sendGetRequest(url, token))
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