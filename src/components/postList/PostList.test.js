import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PostList from './PostList';

describe('PostList component', () => {
  const fetchPostsStub = sinon.stub().resolves([{}]);
  const postService = {
    fetchPosts: fetchPostsStub
  };

  afterEach(() => {
    fetchPostsStub.resetHistory();
  });

  it('renders without crashing', () => {
    shallow(<PostList postService={postService} />);
  });

  it('calls fetchPosts', () => {
    shallow(<PostList postService={postService} />);
    expect(postService.fetchPosts.callCount).toBe(1);
  });

  it('renders a Post component for each entry in the response', () => {
    fetchPostsStub.resolves([{}, {}]);
    const wrapper = shallow(<PostList postService={postService} />);
    wrapper
      .instance()
      .componentDidMount()
      .then(() => {
        wrapper.update();
        expect(wrapper.text()).toBe('<Post /><Post />');
      });
  });
});
