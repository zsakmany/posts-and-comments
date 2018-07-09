import React from 'react';

import PostList from './components/postList/PostList';
import { postService } from './services/PostService';

export default class App extends React.Component {
  render() {
    return (
      <main className="App">
        <h1>My Awesome Blog</h1>
        <PostList postService={postService} />
      </main>
    );
  }
}
