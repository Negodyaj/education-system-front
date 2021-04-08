import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { isJSDocReturnTag } from 'typescript';
import { Tag } from '../interfaces/Tag';
import TagList from './tag-list/TagList';
import './TagsPage.css';
import wretch from 'wretch';
import { sendGetRequest } from '../../services/http.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchComponent from '../../shared/components/search-component/SearchComponent';


function TagsPage() {
    const url = 'Tag';
    const [tagsInState, setTagsInState] = useState<Tag[]>([]);
    const [searchTurn, setSearchTurn] = useState('');
    const getTags = async () => {
        setTagsInState(await sendGetRequest<Tag[]>(url))
    };

    useEffect(() => {
        getTags();
    }, []);

    const tagsFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchTurn(e.target.value);
    };

    // const searchFromTags = (str: string) => {
    //     setSearchTurn(str);
    // e
    return (

        <div className="table">
            <div className="header">
                <div className="input">
                    <input onChange={tagsFilter} />
                    
                        
                            <button className="add"></button>
            </div>
            </div>
            
                <div className="body">
                    <div className="tags"> <TagList str={searchTurn} tags={tagsInState}></TagList> </div>
                </div>
            </div>

    )


}

export default TagsPage



