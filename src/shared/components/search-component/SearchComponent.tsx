import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { RefObject } from 'react';
import './SearchComponent.css';

interface ISearchProps {
  funcSearch: (str: string) => void;
}

const SearchComponent = (props: ISearchProps) => {
  const textInput = React.createRef<HTMLInputElement>();

  const search = (text: RefObject<HTMLInputElement>) => {
    props.funcSearch(`${text.current?.value}`);
  };

  return (
    <div className="search-component">
      <div className="input">
        <FontAwesomeIcon icon="search" />
        <input
          type="text"
          onChange={() => search(textInput)}
          placeholder="Поиск по темам"
          ref={textInput}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
