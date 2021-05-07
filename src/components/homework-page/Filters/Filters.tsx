import { FilterParameter } from '../../../classes/FilterParameter';

import DrawFilter from './filter/DrawFilter';
import './Filters.css';

interface DrawFilterAttributes {
  filterParameters: FilterParameter[];
}

function Filters(attributes: DrawFilterAttributes) {
  return (
      <div className="row align-items-start filters">{
      {attributes.filterParameters.map((filter) => (
              <DrawFilter filterToRender={filter} />))
      ))}
          <div className="col">
              <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="поиск по тегам" />
              <datalist id="datalistOptions" />
      </div>
    </div>
  );
}

export default Filters;
