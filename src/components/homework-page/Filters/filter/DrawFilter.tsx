import { useState } from 'react';
import { FilterParameter } from '../../../../classes/FilterParameter';
import './Filter.css';

interface FilterToRender {
    filterToRender: FilterParameter;
}



function DrawFilter(attributes: FilterToRender) {
    const [listVisibility, setListVisibility] = useState("hidden");

    const showCheckBoxes = () => {
        if (listVisibility=="hidden"){
        setListVisibility("");}
        else setListVisibility("hidden");
    }
    return (
        <div className="col">
            <div className="multiselect">
                <div className="selectBox" onClick={showCheckBoxes}>
                    <select >
                        <option>{attributes.filterToRender.FilterType}</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div className={"listItems " + (listVisibility)}>{
                    attributes.filterToRender.Content.map(item => (
                        <label><input type="checkbox" />{item}</label>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default DrawFilter;