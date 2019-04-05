import React, { Component } from 'react';

function DropDown(props) {
  var {children, dropDownOpen, dropDownHeader, dropDownHeaderSelected, onToggleDropDown} = props;
  return (
    <span className="dropdown">
      <span
        className={"dropdown-header" + (dropDownHeaderSelected ? " selected" : "")}
        onClick={onToggleDropDown}
      >
        {dropDownHeader}
      </span>
      {
        dropDownOpen && (
          <>
            {children}
            <div onClick={onToggleDropDown}>Close</div>
          </>
        )
      }
    </span>
  );

}

export default DropDown;
