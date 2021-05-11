import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleModalHidden } from '../../../store/tags-page/action-creators';
import { addTag } from '../../../store/tags-page/thunk';
import {
  CommonButton,
  DisabledButton,
  RoundButton,
} from '../../../shared/styled-components/buttonStyledComponent';

interface AddTagModalProps {
  hidden: boolean;
}

function AddTagModal(props: AddTagModalProps) {
  const { hidden } = props;
  const [nameNewTag, setNameNewTag] = useState('');
  const dispatch = useDispatch();
  const closeModalWindow = () => {
    dispatch(toggleModalHidden());
  };
  const tagOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNameNewTag(e.target.value);

    if (e.target.value.length > 2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const AddNewTag = () => {
    dispatch(addTag({ name: nameNewTag }));
  };
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <div className={`modal-back ${hidden && 'hidden'}`}>
      <div className="modal">
        <div className="head-modal">
          <h4>Введите новый тег</h4>
          <RoundButton as="button" onClick={closeModalWindow}>
            <FontAwesomeIcon icon="times" />
          </RoundButton>
        </div>
        <div className="create-tag">
          <div className="tag-data">
            <input
              type="text"
              className="tag-name"
              value={nameNewTag}
              onChange={tagOnChange}
            />
          </div>
        </div>
        <div className="select-delete">
          <CommonButton as="button" onClick={closeModalWindow}>
            Отмена
          </CommonButton>
          <DisabledButton as="button" onClick={AddNewTag} disabled={isDisabled}>
            Ок
          </DisabledButton>
        </div>
      </div>
    </div>
  );
}
export default AddTagModal;
