import React from 'react';

const Filter = ({onChangeFilter, filter}) => {

  return (<input onChange={onChangeFilter} value={filter}></input>);
}

export default Filter