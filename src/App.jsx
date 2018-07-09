import React from 'react';

import PostList from './components/postList/PostList';
import { postService } from './services/PosrtService';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>My Awesome Blog</h1>
        <PostList postService={postService} />
      </div>
    );
  }
}
