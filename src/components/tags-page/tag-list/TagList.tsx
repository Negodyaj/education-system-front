import React, { useEffect, useState } from "react";
import { sendDeleteRequest, sendDeleteRequestNoResponse, sendGetRequest } from "../../../services/http.service";
import { isTagArr } from "../../../services/type-guards/tagArr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "../../../interfaces/Tag";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../../../store/tags-page/thunk";
import { IRootState } from "../../../store";


interface TagListProps {
    setTagsInState: (uptags: Tag[] | undefined) => void;
    str: string;
}

function TagList(props: TagListProps) {
    const [deletedTag, setdeleteTag] = useState('');
    const dispatch = useDispatch()
    const pageState = useSelector((state: IRootState) => state.tagsPage);
console.log (pageState)
    useEffect(() => {
        dispatch(getTags());
    }, []);

    const deleteTag = async (tagId: number) => {
        if (await sendDeleteRequestNoResponse(`Tag/${tagId}`))
            props.setTagsInState(await sendGetRequest<Tag[]>('Tag', isTagArr))
    }

    return (
        <>
            {
                pageState.tagList.map((item) => 

                    (
                        <div className="tag-row">
                            <div className="tag"> {item.name} </div>
                            <button className='button-round' onClick={() => deleteTag(item.id)}>
                                <FontAwesomeIcon icon="trash" />
                            </button>
                        </div>
                    )

                )
            } 
        </>
    )
}

export default TagList