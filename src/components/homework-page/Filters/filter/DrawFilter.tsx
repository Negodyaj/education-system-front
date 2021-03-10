import { FilterParameter } from '../../../../classes/FilterParameter';
import './Filter.css';

interface FilterToRender {
    filterToRender: FilterParameter;
}

function DrawFilter(attributes: FilterToRender) {
    return (
        <div className="col">
            <div className="multiselect">
                <div className="selectBox">
                    <select>
                        <option>{attributes.filterToRender.FilterType}</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div className="listItems">{
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