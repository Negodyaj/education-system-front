import React, { useEffect, useState } from "react";
import { sendDeleteRequest, sendDeleteRequestNoResponse, sendGetRequest } from "../../../services/http.service";
import { isTagArr } from "../../../services/type-guards/tagArr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "../../../interfaces/Tag";
import { useDispatch, useSelector } from "react-redux";
import { deleteTagThunk, getTags } from "../../../store/tags-page/thunk";
import { IRootState } from "../../../store";


interface TagListProps {
    setTagsInState: (uptags: Tag[] | undefined) => void;
    str: string;
}

function TagList(props: TagListProps) {
    const [deletedTag, setdeleteTag] = useState('');
    const dispatch = useDispatch()
    const pageState = useSelector((state: IRootState) => state.tagsPage);

    useEffect(() => {
        dispatch(getTags());
    }, []);

    const deleteTag = (id: number) => {
        dispatch(deleteTagThunk(id))}
        
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
        )}
    

    export default TagList