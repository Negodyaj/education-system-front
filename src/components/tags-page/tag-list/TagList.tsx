import React, { useState } from "react";
import { sendDeleteRequest, sendDeleteRequestNoResponse, sendGetRequest } from "../../../services/http.service";
import { responseHandlers } from "../../../services/response-handler/responseHandler";
import { isTagArr } from "../../../services/type-guards/tagArr";
import { TagDeleteEnd, TagEnd } from "../../../shared/endpointConsts";
import NotificationData from "../../../shared/interfaces/NotificationData";
import { Tag } from "../../interfaces/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface TagListProps {
    tags: Tag[] | undefined;
    setTagsInState: (uptags: Tag[] | undefined) => void;
    str: string;
}


function TagList(props: TagListProps) {
    const [deletedTag, setdeleteTag] = useState('');
    const deleteTag = async (tagId: number) => {
       
       if (await sendDeleteRequestNoResponse('Tag/' + tagId))           
       await props.setTagsInState(await sendGetRequest<Tag[]>('Tag', isTagArr))  
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