import { ChangeEventHandler, SetStateAction, useState } from 'react'
import Select, { ActionMeta, OptionsType, SelectOptionActionMeta } from 'react-select'
import { Role } from '../interfaces/Role';

interface SelectProps {
  selectType?: string;
  userOptions: OptionsType<object>;
  options: OptionsType<object>;
  onSelect: (items: OptionsType<object>) => void;
}

function CustomMultiSelect(props: SelectProps) {

  const [userOptions, setUserOptions] = useState(props.userOptions);

  const SingleSelect = () => (
    <Select options={props.userOptions} />
  )

    const onSelect = (selectedOptions: OptionsType<object>, action: ActionMeta<object>) =>{
      console.log((action as SelectOptionActionMeta<object>).option);
      setUserOptions(userOptions.concat(selectedOptions as object[]));
      props.onSelect(userOptions);
    }

  const MultiSelect = () => (
    <Select
      isMulti
      name="Role"
      options={props.options}
      value={userOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={onSelect}
    />
  )
  return (
    <div>
      {
        props.selectType === 'multi' ? MultiSelect() : SingleSelect()
      }
    </div>
  )
}

export default CustomMultiSelect;