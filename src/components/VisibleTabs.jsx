import React from 'react';
import Tab from './Tab'

function VisibleTabs(props) {
  var {tabs, overflowIndex, onSelect, selectedIndex} = props;
  return tabs.slice(0, overflowIndex).map((tab, i) =>
    <Tab
      key={i}
      id={i}
      name={tab}
      selected={i === selectedIndex}
      onSelect={onSelect}
    />
  );
}

export default VisibleTabs;
