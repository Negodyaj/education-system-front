import Select from 'react-select'

interface SelectProps {
  selectType?: string,
  options: object[]
}

function CustomMultiSelect(props: SelectProps) {

    
    const SingleSelect = () => (
      <Select options={props.options} />
    )
      
    
    const MultiSelect = () => (
      <Select
        isMulti
        name="Role"
        options={props.options}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    )
    return(
      <div>
        {
          props.selectType === 'multi' ? <MultiSelect /> : <SingleSelect />
        }
      </div>
    )
}

export default CustomMultiSelect;