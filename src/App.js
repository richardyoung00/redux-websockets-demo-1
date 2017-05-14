import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { createFileAction } from './actions/files';
import fileIcon from './images/file-icon.png' ;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handle change
  handleChange = (e) => {
    this.setState({input: e.target.value});
  };

  // handle click
  handleClick = () => {
    this.props.createFile(this.state.input);
  };

  // render file item
  renderFileItem(item) {
    return (
    <div key={item}>
      <img className="fileIcon" alt="icon" src={fileIcon}/>
      <div className="fileName">{item}</div>
    </div>
    );
  }

  render() {
    return (
      <div className="app">
        {/* render input box to create file */}
        <div>
          <input type="text" onChange={ this.handleChange }/>
          <button onClick={this.handleClick}>Create file</button>
        </div>
        {/* render list of files */}
        <div>
          {this.props.fileList.map((item) => this.renderFileItem(item))}
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => {
  return {
    fileList: state.files.fileList,
  }
};

// map dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    createFile: (filename) => {
      dispatch(createFileAction(filename))
    },
  }
};

// connect app to redux
App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;