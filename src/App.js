import logo from './logo.svg';
import './App.css';
import React from 'react';
import rawData from './data_result.json';
import ColumnFilter from './ColumnFilter';

function App() {
  let columnWidths = {}
  let [data, setData] = React.useState(null)
  let [filteredData, setFilteredData] = React.useState(null)

  React.useEffect(() => {
    setData(rawData.EstablishmentScores)
  }, [rawData])

  const renderTable = (input) => {
    console.log('rendering table?')

    let dataArray = []
    if(!Array.isArray(input)){
      for(const[key, value] of Object.entries(input)){
        // console.log('got object key ', key)
        dataArray.push({"key": key, ...value})
      }
      setData(dataArray)
    }else{
      dataArray = input;
    }

    const headers = Object.keys(dataArray[0])

    for(const header of headers){
      let columnWidth = getColumnMinWidth(dataArray, header, header.toString().length)
      columnWidths[header] = columnWidth
    }

    return(
      <div className="body">
        {renderHeaderRow(dataArray[0])}
        {renderBody(dataArray)}
      </div>
    )
  }

  const getColumnMinWidth = (rows, columnName, min) => {
    let minWidth = min;
    for(const row of rows){
      let cellValue = row[columnName]
      //console.log('getting cellvalue for ', columnName)
      if(cellValue){
        let cellWidth = cellValue.toString().length
        if(cellWidth > minWidth){
          minWidth = cellWidth
        }
      }
    }
    return minWidth
  }

  const renderBody = (rows) => {

    return rows.map((v, i) => {
      return (
        <div key={`row_${i}`} className="row">
          {renderObjectCells(v)}
        </div>
      )
    })
  }

  const renderHeaderRow = (obj) => {
    return(
      <div key={'header'} className="header">
        {Object.keys(obj).map((v, i) => {
          return(
            <div key={`header_cell_${i}`} className="cell" style={{width: `${(columnWidths[v]*.55)}rem`}}>
              {v}
              <ColumnFilter onChange={onFilterChange} name={v} />
            </div>
          ) 
        })}
      </div>
    )
  }

  const renderObjectCells = (obj) => {

    return Object.keys(obj).map((v, i) => {
      return(
        <div key={`${v}_${i}`} className="cell" style={{width: `${(columnWidths[v]*.55)}rem`}}>
          {obj[v]}
        </div>
      )
    })
  }

  const onFilterChange = (name, val) => {
    setData(data.filter((v, i) => {
      console.log(`filter ${JSON.stringify(v)} for ${name} and ${v[name]}`)
      return v[name].toLowerCase().indexOf(val.toLowerCase()) > -1
    }))
  }

  return (
    <div className="App">
      {
        data &&
        renderTable(filteredData || data)
      }
    </div>
  );
}

export default App;
