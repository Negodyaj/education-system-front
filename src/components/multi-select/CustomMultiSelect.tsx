import { useState } from 'react'
import Select from 'react-select'

interface SelectProps {
  selectType?: string;
  userOptions: object[];
  options: object[];
  onSelect: (items: object[]) => void;
}

function CustomMultiSelect(props: SelectProps) {

  const [userOptions, setUserOptions] = useState(props.userOptions);

  const SingleSelect = () => (
    <Select options={props.userOptions} />
  )

    const onSelect = () =>{
      setUserOptions(userOptions);
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