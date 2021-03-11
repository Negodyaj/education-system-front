import { useState } from 'react';
import { FilterParameter } from '../../../../classes/FilterParameter';
import './Filter.css';

interface FilterToRender {
    filterToRender: FilterParameter;
}



function DrawFilter(attributes: FilterToRender) {
    const [listVisibility, setListVisibility] = useState("hidden");

    const toggleCheckBoxes = () => {
        if (listVisibility == "hidden") {
            setListVisibility("");
        }
        else setListVisibility("hidden");
    }
    return (
        <div className="col">
            <div className="multiselect">
                <div className="selectBox" onClick={toggleCheckBoxes}>
                    <select >
                        <option>{attributes.filterToRender.FilterType}</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div className={"list-items " + (listVisibility)}>{
                    attributes.filterToRender.Content.map(item => (
                        <label><input type="checkbox" />{" "+item}</label>
                    ))
                }
                    <div className="list-items-footer">
                        <button className="apply-filter-btn btn-success" onClick={toggleCheckBoxes}>применить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DrawFilter;