import React from 'react';

function ColumnFilter(props) {
  const[value, setValue] = React.useState("")

  const onChange = (e) => {
    setValue(e.target.value)
    props.onChange(props.name, e.target.value)
  }

  return (
    <input type="text" value={value} onChange={onChange} className='column-filter'/>
  );
}

export default ColumnFilter;
