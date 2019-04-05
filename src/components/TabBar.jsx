import React, { Component } from 'react';
import VisibleTabs from './VisibleTabs'
import DropDownMenu from './DropDownMenu'
import DropDown from './DropDown'
import '../TabBar.css';

class TabBar extends Component {
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

export default TabBar;
