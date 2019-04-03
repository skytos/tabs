import React, { Component } from 'react';
import './App.css';

class Tab extends Component {
  render() {
    return (
      <span
        className={"tab" + (this.props.selected ? " selected" : "")}
        onClick={this.props.onSelect}
      >
        {this.props.name}
      </span>
    )
  }
}

class App extends Component {
  state = {
    tabs: ["Cool Stuff", "Longer Items Are Here", "Boo", "Babba Nogga"],
    selected: 0,
  }

  handleSelect(i) { this.setState({selected: i});}

  render() {
    return (
      <div className="App">
        {this.state.tabs.map((tab, i) =>
          <Tab
            name={tab}
            key={i}
            selected={i === this.state.selected}
            onSelect={()=>this.handleSelect(i)}
          />
        )}
      </div>
    );
  }
}

export default App;
