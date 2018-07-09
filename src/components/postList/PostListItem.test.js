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
});
