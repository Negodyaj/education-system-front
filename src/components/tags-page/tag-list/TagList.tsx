import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { Tag } from '../../../interfaces/Tag';
import {
  RoundButton,
  CommonButton,
} from '../../../shared/styled-components/buttonStyledComponent';
import {
  deleteTagWatcherAction,
  loadTagsListWatcherAction,
} from '../../../store/tags-page/action-creators';
import { IRootState } from '../../../store';

interface TagListProps {
  str: string;
}

function TagList(props: TagListProps) {
  const dispatch = useDispatch();
  const pageState = useSelector((state: IRootState) => state.tagsPage);

  useEffect(() => {
    dispatch(loadTagsListWatcherAction());
  }, []);

  const deleteTag = (tag: Tag) => {
    dispatch(deleteTagWatcherAction(tag.id, tag.name));
  };

  return (
    <>
      {pageState.filterTagsList.map((item) => (
        <div className="tag-row">
          <div className="tag"> {item.name} </div>
          <RoundButton as="button" onClick={() => deleteTag(item)}>
            <FontAwesomeIcon icon="trash" />
          </RoundButton>
        </div>
      ))}
    </>
  );
}

export default TagList;
