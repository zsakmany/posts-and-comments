import React from 'react';

export default class PostListItemToolbar extends React.Component {
  render() {
    return (
      <div
        className="postListItem__toolbar btn-toolbar d-flex justify-content-between"
        role="toolbar"
        aria-label="Comment toolbar"
      >
        <div className="btn-group" role="group" aria-label="Edit and delete">
          <button className="btn btn-secondary" type="button" onClick={() => this.props.handleSaveClick()}>
            {this.props.isPostUnderEdit ? 'Save' : 'Edit'}
          </button>
          <button className="btn btn-secondary btn-danger" type="button" onClick={() => this.props.handleDeleteClick()}>
            Delete
          </button>
        </div>
        <button className="btn btn-secondary" type="button" onClick={() => this.props.handleShowCommentClick()}>
          {this.props.areCommentsVisible ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>
    );
  }
}
