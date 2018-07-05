import React from 'react';

export default class Post extends React.Component {
  render() {
    return <span>{this.props.data}</span>;
  }
}
