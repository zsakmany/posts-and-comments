import React from 'react';
import Comments from '../Comments';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false,
      body: props.post.body
    };
  }

  getCommentButtonLabel() {
    return this.props.post.comments.length ? 'Hide Comments' : 'Show Comments';
  }

  onHandleSaveClick() {
    if (this.state.edited) {
      this.props.updatePost(this.state.body);
    }
    this.setState({ edited: !this.state.edited });
  }

  render() {
    return (
      <div>
        <h3>{this.props.post.title}</h3>
        {this.state.edited ? (
          <textarea
            defaultValue={this.props.post.body}
            onChange={event => {
              this.setState({ body: event.target.value });
            }}
          />
        ) : (
          <p>{this.props.post.body}</p>
        )}
        <div>
          <button onClick={() => this.onHandleSaveClick()}>{this.state.edited ? 'Save' : 'Edit'}</button>
          <button onClick={() => this.props.deletePost()}>Delete</button>
          <button className="comments" onClick={() => this.props.toggleComments()}>
            {this.getCommentButtonLabel()}
          </button>
        </div>
        <Comments comments={this.props.post.comments} />
      </div>
    );
  }
}
