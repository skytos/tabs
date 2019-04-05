import React from 'react';

function Tab(props) {
  var {id, name, onSelect, selected} = props;
  return (
    <span
      className={"tab" + (selected ? " selected" : "")}
      onClick={() => onSelect(id)}
    >
      {name}
    </span>
  );
}
export default Tab;
