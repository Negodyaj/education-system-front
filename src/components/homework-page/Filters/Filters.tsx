import { FilterParameter } from '../../../classes/FilterParameter';
import DrawFilter from './filter/DrawFilter';
import './Filters.css';

interface DrawFilterAttributes {
    RoleId:number;
    filterParameters: FilterParameter[];
}

function Filters(attributes: DrawFilterAttributes) {
    return (
        <div className="row align-items-start filters">{
            attributes.filterParameters.map(filter => (
                filter.FilterType=="Группа" ? attributes.RoleId==5
                &&
                <DrawFilter filterToRender={filter}></DrawFilter>
                :
                <DrawFilter filterToRender={filter}></DrawFilter>))
        }
            <div className="col">
                <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="поиск по тегам"></input>
                <datalist id="datalistOptions">
                </datalist>
            </div>
        </div>
    )
}

export default Filters;