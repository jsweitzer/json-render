import React from 'react';

function ColumnSort(props) {
  const onClick = (e) => {
    switch(props.value){
        case "desc":
            props.onChange(props.name, "asc")
            break;
        case "asc":
            props.onChange(props.name, false)
            break;
        default:
            props.onChange(props.name, "desc")
    }
  }

  const renderArrow = () => {
      switch(props.value){
        case "asc": 
            return "8593"
        case "desc":
            return "8595"
        default:
            return "8693"
      }
  }

  return (
    <div onClick={onClick} className='column-sort'>
        {String.fromCharCode(renderArrow())}
    </div>
  );
}

export default ColumnSort;
