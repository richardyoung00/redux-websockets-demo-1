import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { createFileAction } from './actions/index';
import fileIcon from './images/file-icon.png' ;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e) => {
    this.setState({input: e.target.value});
  };

  handleClick = () => {
    this.props.createFile(this.state.input);
  };

  renderFileItem(item) {
    return (
    <div >
      <img className="fileIcon" src={fileIcon}/>
      <div className="fileName">{item}</div>
    </div>

    );
  }

  render() {
    return (
      <div className="app">
        <div>
          <input type="text" onChange={ this.handleChange }/>
          <button onClick={this.handleClick}>Create file</button>
        </div>
        <div>
          {this.props.fileList.map((item) => this.renderFileItem(item))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fileList: state.fileChanges.fileList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFile: (filename) => {
      dispatch(createFileAction(filename))
    },
  }
};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;