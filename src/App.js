import React, { Component } from 'react';
import './App.css';

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

function VisibleTabs(props) {
  var {tabs, overflowIndex, onSelect, selectedIndex} = props;
  return (
    <>
    {tabs.slice(0, overflowIndex).map((tab, i) =>
        <Tab
        key={i}
        id={i}
        name={tab}
        selected={i === selectedIndex}
        onSelect={onSelect}
      />
    )}
    </>
  )
}


function DropDownMenu(props) {
  var {tabs, overflowIndex, onSelect, selectedIndex} = props;
  return (
    <ul>
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

class App extends Component {
  constructor() {
    super();
    this.ref = React.createRef();
    window.addEventListener("resize", this.handleResize);
  }

  state = {
    tabs: ["Cool Stuff", "Longer Items Are Here", "Boo", "Babba Nogga", "BlaBla", "Weee"],
    selectedIndex: 0,
    overflowIndex: undefined,
    dropDownOpen: false,
  }

  dropDownHeaderSelected() {
    return this.state.selectedIndex >= this.state.overflowIndex;
  }
  
  dropDownHeader() {
    return this.dropDownHeaderSelected() ?
      this.state.tabs[this.state.selectedIndex] :
      "More";
  }
  
  handleResize = () => {
    if (this.ref.current.scrollWidth > window.innerWidth) {
      var overflowIndex = this.state.overflowIndex !== undefined ? this.state.overflowIndex - 1 : this.state.tabs.length - 1;
      this.setState({overflowIndex});
    }
  }

  handleSelect = (i) => {
    this.setState({selectedIndex: i});
  };

  handleToggleDropDown = () => {
    this.setState({dropDownOpen: !this.state.dropDownOpen});
  };

  componentDidMount() {
    this.handleResize();
  }
  componentDidUpdate() {
    this.handleResize();
  }

  render() {
    return (
      <div className="tab-bar" ref={this.ref}>
        <VisibleTabs
          tabs={this.state.tabs}
          selectedIndex={this.state.selectedIndex}
          overflowIndex={this.state.overflowIndex}
          onSelect={this.handleSelect}
        />
        { this.state.overflowIndex !== undefined &&
          <DropDown
            dropDownOpen={this.state.dropDownOpen}
            onToggleDropDown={this.handleToggleDropDown}
            dropDownHeader={this.dropDownHeader()}
            dropDownHeaderSelected={this.dropDownHeaderSelected()}
          >
            <DropDownMenu
              tabs={this.state.tabs}
              selectedIndex={this.state.selectedIndex}
              overflowIndex={this.state.overflowIndex}
              onSelect={(i)=>{this.handleSelect(i);this.handleToggleDropDown();}}
            />
          </DropDown>
        }
      </div>
    );
  }
}

export default App;
