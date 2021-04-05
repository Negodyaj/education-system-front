import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { isJSDocReturnTag } from 'typescript';
import { Tag } from '../interfaces/Tag';
import TagList from './tag-list/TagList';
import './TagsPage.css';

function TagsPage() {
    const url = 'https://80.78.240.16:7070/api/Tag';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidm9sb2R5YTIyIiwiaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoi0JDQtNC80LjQvdC40YHRgtGA0LDRgtC-0YAiLCJuYmYiOjE2MTc0MDAxOTEsImV4cCI6MTYxNzU3Mjk5MSwiaXNzIjoiRWR1Y2F0aW9uU3lzdGVtLkFwaSIsImF1ZCI6IkRldkVkdWNhdGlvbiJ9.dDqTbgWfcosL514S3BKE-1DF7w0QCsRrasRTfwK4y7U';
    const [tagsInState, setTagsInState] = useState<Tag[]>([]);
    const getTags = () => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => { setTagsInState(data); }
            )
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