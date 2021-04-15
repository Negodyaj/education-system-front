import React, { useState } from "react";
import { sendDeleteRequest, sendDeleteRequestNoResponse, sendGetRequest } from "../../../services/http.service";
import { isTagArr } from "../../../services/type-guards/tagArr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "../../../interfaces/Tag";


interface TagListProps {
    tags: Tag[] | undefined;
    setTagsInState: (uptags: Tag[] | undefined) => void;
    str: string;
}

function TagList(props: TagListProps) {
    const [deletedTag, setdeleteTag] = useState('');
    const deleteTag = async (tagId: number) => {
        if (await sendDeleteRequestNoResponse(`Tag/${tagId}`))           
     props.setTagsInState(await sendGetRequest<Tag[]>('Tag', isTagArr))  
    }

    return (
        <>
            {
                props.tags?.map((item) => {
                    if (item.name.toLowerCase().includes(props.str.toLowerCase())) {
                        return (
                            <span className="tag-row">
                                <div className="tag"> {item.name} </div>
                                <button className='button-round' onClick={() => deleteTag(item.id)}>
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                            </span>
                        )
                    }
                })
            }
        </>
    )
}

export default TagList