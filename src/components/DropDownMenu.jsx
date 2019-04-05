import React from 'react';
import Tab from './Tab'

function DropDownMenu(props) {
  var {tabs, overflowIndex, onSelect, selectedIndex} = props;
  return (
    <ul className="dropdown-menu">
      {tabs.slice(overflowIndex).map((tab, i) =>
        <li key={"li-"+(i+overflowIndex)}>
          <Tab
            key={i+overflowIndex}
            id={i+overflowIndex}
            name={tab}
            selected={i+overflowIndex === selectedIndex}
            onSelect={onSelect}
          />
        </li>
      )}
      </ul>
  )
}
export default DropDownMenu;
