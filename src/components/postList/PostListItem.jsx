import React from 'react';
import Comments from '../Comments';

export default class Post extends React.Component {
  getCommentButtonLabel() {
    return this.props.post.comments.length ? 'Hide Comments' : 'Show Comments';
  }

  render() {
    return (
      <div>
        <h3>{this.props.post.title}</h3>
        <p>{this.props.post.body}</p>
        <div>
          <button>Edit</button>
          <button>Delete</button>
          <button className="comments" onClick={() => this.props.onClick()}>
            {this.getCommentButtonLabel()}
          </button>
        </div>
        <Comments comments={this.props.post.comments} />
      </div>
    );
  }
}
