import React from 'react';
import Comments from './Comments';

import { shallow } from 'enzyme';

describe('Comments', () => {
  it('renders without crashing', () => {
    const comments = [
      {
        email: 'a@b.com',
        body: 'body of the comment'
      }
    ];
    shallow(<Comments comments={comments} />);
  });
});
