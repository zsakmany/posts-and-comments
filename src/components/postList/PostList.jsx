import React from 'react';
import Post from './PostListItem';

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    return this.props.postService.fetchPosts().then(posts => this.setState({ posts }));
  }

  async toggleComments(postId) {
    const post = this.state.posts.find(p => p.id === postId);
    let comments = [];

    if (!hasComments(post)) {
      comments = await this.props.postService.fetchComments(postId);
    }

    post.comments = comments;
    this.setState({
      posts: [...this.state.posts]
    });
  }

  render() {
    return (
      <ul>
        {this.state.posts.map((post, i) => {
          return (
            <li key={i}>
              <Post
                post={post}
                onClick={() => {
                  this.toggleComments(post.id);
                }}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

function hasComments(post) {
  return post.comments && post.comments.length > 0;
}
