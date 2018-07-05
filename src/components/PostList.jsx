import React from 'react';
import Post from './Post';

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ['post1']
    };
  }

  render() {
    return (
      <ul>
        {this.state.posts.map((post, i) => {
          return (
            <li key={i}>
              <Post data={post} />
            </li>
          );
        })}
      </ul>
    );
  }
}
