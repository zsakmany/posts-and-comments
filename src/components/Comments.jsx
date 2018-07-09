import React from 'react';
import './Comments.css';

export default class Comments extends React.Component {
  render() {
    return (
      <ul className="comments">
        {this.props.comments.map((comment, i) => {
          return (
            <li key={i} className="comments__item">
              <em className="comments__email">{comment.email}</em>
              <br />
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}
