interface TableBuilderProps {
  list: Object[];
}

function TableBuilder(props: TableBuilderProps) {
  return (
    <>
      {props.list.map((item) => (
        <div>
          {Object.values(item).map((itemProp) => (
            <span>
              {itemProp instanceof Object || Array
                ? itemProp.toString()
                : itemProp}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}

export default TableBuilder;
