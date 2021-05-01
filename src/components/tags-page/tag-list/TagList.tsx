import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "../../../interfaces/Tag";
import { useDispatch, useSelector } from "react-redux";
import { deleteTagThunk, getTags } from "../../../store/tags-page/thunk";
import { IRootState } from "../../../store";
import { RoundButton, CommonButton } from "../buttonStyledComponent";




interface TagListProps {
       str: string;
}

function TagList(props: TagListProps) {
    const dispatch = useDispatch()
    const pageState = useSelector((state: IRootState) => state.tagsPage);

    useEffect(() => {
        dispatch(getTags());
    }, []);

    const deleteTag = (tag: Tag) => {
        dispatch(deleteTagThunk(tag.id, tag.name))}
        
        return (
            <>
                {
                    pageState.filterTagsList.map((item) =>
                    (
                        <div className="tag-row">
                            <div className="tag"> {item.name} </div>
                            <RoundButton as='button' onClick={() => deleteTag(item)}>
                                <FontAwesomeIcon icon="trash" />
                            </RoundButton>
                        </div>
                    )
                    )
                }
            </>
        )}
    

    export default TagList