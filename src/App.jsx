import React from 'react';

import PostList from './components/PostList';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PostList />
      </div>
    );
  }
}
