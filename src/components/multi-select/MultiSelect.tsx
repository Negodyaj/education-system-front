import React, { Component } from 'react'
import Select from 'react-select'


function MultiSelect() {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    
    const MyComponent = () => (
        <Select
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    )
    return(
        <div>
            
                <MyComponent />
            
        </div>
    )
}

export default MultiSelect;