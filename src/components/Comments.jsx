import React from 'react';

export default class Comments extends React.Component {
  render() {
    return (
      <ul>
        {this.props.comments.map((comment, i) => {
          return <li key={i}>{comment.body}</li>;
        })}
      </ul>
    );
  }
}
