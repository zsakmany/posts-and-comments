import React from 'react';
import PostListItem from './PostListItem';

import { shallow } from 'enzyme';

describe('Post List Item', () => {
  it('Renders without crashing', () => {
    const post = {
      comments: []
    };
    shallow(<PostListItem post={post} />);
  });

  it('Renders proper button label when comments are shown', () => {
    const post = {
      comments: ['comment1']
    };
    expect(
      shallow(<PostListItem post={post} />)
        .find('button.comments')
        .contains('Hide Comments')
    ).toBe(true);
  });

  it('Renders proper button label when comments are hidden', () => {
    const post = {
      comments: []
    };
    expect(
      shallow(<PostListItem post={post} />)
        .find('button.comments')
        .contains('Show Comments')
    ).toBe(true);
  });
});
