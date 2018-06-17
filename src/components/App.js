import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from 'actions';

import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

class App extends Component {
  renderButton() {
    let label = this.props.auth ? 'Sign Out' : 'Sign In';
    return (
      <button onClick={() => this.props.changeAuth(!this.props.auth)}>
        {label}
      </button>
    );
  }

  renderHeader() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post A Comment</Link>
        </li>
        <li>{this.renderButton()}</li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        <Route path="/post" component={CommentBox} />
        <Route path="/" exact component={CommentList} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(App);
