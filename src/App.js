import './App.css';
import React from 'react';
import rawData from './data_result.json';
import ColumnFilter from './ColumnFilter';
import ColumnSort from './ColumnSort';

function App() {
  let columnWidths = {}
  let [data, setData] = React.useState(null)
  let [filteredData, setFilteredData] = React.useState(null)
  let [filters, setFilters] = React.useState({})
  let [sort, setSort] = React.useState({})

  React.useEffect(() => {
    setData(rawData.EstablishmentScores)
  }, [rawData])

  const renderTable = (input) => {
    let dataArray = []
    if(!Array.isArray(input)){
      for(const[key, value] of Object.entries(input)){
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
              <div style={{display: 'flex'}}>
                {v} <ColumnSort onChange={onSortChange} name={v} value={sort.name === v ? sort.val : false} />
              </div>
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
    const newFilters = JSON.parse(JSON.stringify(filters))

    newFilters[name] = val

    setFilters(newFilters)

    let newData = getFilteredData(data, newFilters)

    setFilteredData(newData)
  }

  const getFilteredData = (dat, filtrs) => {
    let newData = dat.map((v, i) => {
      return v
    })

    for(const [key, value] of Object.entries(filtrs)){
      newData = newData.filter((v, i) => {
        return v[key].toString().toLowerCase().indexOf(value.toLowerCase()) > -1
      })
    }

    return newData
  }

  const onSortChange = (name, val) => {
    setSort({name, val})

    let newData = getFilteredData(data, filters)

    if(val){
      newData = newData.sort((a, b) => {
        if(val === "asc"){
          return (a[name] < b[name]) ? 1 : -1
        }else if(val === "desc"){
          return (a[name] > b[name]) ? 1 : -1
        }
      })
    }

    setFilteredData(newData)
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
