import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEventHandler, RefObject, useState } from "react";
import './SearchComponent.css';

interface ISearchProps {
  funcSearch: (str: string) => void
}

const SearchComponent = (props: ISearchProps) => {

  const [text, setText] = useState('');
  
  const search: ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
    props.funcSearch('' + text);
  }

  return (
    <div className="search-component">
      <div className="input">
        <FontAwesomeIcon icon='search' />
        <input type="text" onChange={search} placeholder='Поиск по темам' value={text} />
      </div>
    </div>
  )
}

export default SearchComponent;