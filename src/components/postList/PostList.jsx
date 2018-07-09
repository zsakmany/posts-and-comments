import React from 'react';
import Post from './PostListItem';
import './PostList.css';

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  async componentDidMount() {
    const posts = await this.props.postService.fetchPosts();
    this.setState({ posts });
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

  async deletePost(postId) {
    await this.props.postService.deletePost(postId);
    this.setState({
      posts: [...this.state.posts.filter(post => post.id !== postId)]
    });
  }

  async updatePost(postId, body) {
    const post = this.state.posts.find(p => p.id === postId);
    await this.props.postService.updatePost(postId, body);
    post.body = body;
    this.setState({
      posts: [...this.state.posts]
    });
  }

  render() {
    return (
      <ol>
        {this.state.posts.map((post, i) => {
          return (
            <li key={i} className="postList__item">
              <Post
                post={post}
                toggleComments={() => this.toggleComments(post.id)}
                deletePost={() => this.deletePost(post.id)}
                updatePost={body => this.updatePost(post.id, body)}
              />
            </li>
          );
        })}
      </ol>
    );
  }
}

function hasComments(post) {
  return post.comments && post.comments.length > 0;
}
