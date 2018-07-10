import React from 'react';
import Comments from '../Comments';
import './PostListItem.css';
import PostListItemToolbar from './PostListItemToolbar';

export default class PostListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPostUnderEdit: false,
      body: props.post.body,
      loading: false
    };
  }

  async handleSaveClick() {
    if (this.state.isPostUnderEdit) {
      this.setState({ loading: true });
      await this.props.updatePost(this.state.body);
    }
    this.setState({ isPostUnderEdit: !this.state.isPostUnderEdit, loading: false });
  }

  async handleDeleteClick() {
    this.setState({ loading: true });
    await this.props.deletePost();
    this.setState({ loading: false });
  }

  async handleToggleCommentsClick() {
    this.setState({ loading: true });
    await this.props.toggleComments();
    this.setState({ loading: false });
  }

  render() {
    return (
      <article className={(this.state.loading ? 'postListItem--loading' : '') + ' postListItem'}>
        <h3>{this.props.post.title}</h3>
        {this.state.isPostUnderEdit ? (
          <textarea
            className="postListItem__body postListItem__body--edited"
            defaultValue={this.props.post.body}
            cols={130}
            rows={4}
            onChange={event => {
              this.setState({ body: event.target.value });
            }}
          />
        ) : (
          <p className="postListItem__body">{this.props.post.body}</p>
        )}
        <PostListItemToolbar
          isPostUnderEdit={this.state.isPostUnderEdit}
          areCommentsVisible={!!this.props.post.comments.length}
          handleSaveClick={() => this.handleSaveClick()}
          handleDeleteClick={() => this.handleDeleteClick()}
          handleShowCommentClick={() => this.handleToggleCommentsClick()}
        />
        <Comments comments={this.props.post.comments} />
      </article>
    );
  }
}
