import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PostList from './PostList';

describe('PostList component', () => {
  const fetchPostsStub = sinon.stub().resolves([{}]);
  const deletePostStub = sinon.stub().resolves({});
  const updatePostStub = sinon.stub().resolves({});
  const postService = {
    fetchPosts: fetchPostsStub,
    deletePost: deletePostStub,
    updatePost: updatePostStub
  };

  afterEach(() => {
    fetchPostsStub.resetHistory();
    deletePostStub.resetHistory();
    updatePostStub.resetHistory();
  });

  it('renders without crashing', () => {
    shallow(<PostList postService={postService} />);
  });

  it('calls fetchPosts', () => {
    shallow(<PostList postService={postService} />);
    expect(postService.fetchPosts.callCount).toBe(1);
  });

  it('renders a Post component for each entry in the response', async done => {
    fetchPostsStub.resolves([{}, {}]);
    const wrapper = shallow(<PostList postService={postService} />);
    await wrapper.instance().componentDidMount();

    wrapper.update();
    expect(wrapper.text()).toBe('<Post /><Post />');
    done();
  });

  it('deletes post', async done => {
    const wrapper = shallow(<PostList postService={postService} />);
    await wrapper.instance().componentDidMount();

    wrapper.setState({ posts: [{ id: 1 }, { id: 2 }] });
    await wrapper.instance().deletePost(1);

    expect(deletePostStub.callCount).toEqual(1);
    expect(wrapper.state()).toEqual({ posts: [{ id: 2 }] });
    done();
  });

  it('updates post', async done => {
    const wrapper = shallow(<PostList postService={postService} />);
    await wrapper.instance().componentDidMount();

    wrapper.setState({ posts: [{ id: 1, body: '' }] });
    await wrapper.instance().updatePost(1, 'Foo');

    expect(updatePostStub.callCount).toEqual(1);
    expect(wrapper.state()).toEqual({ posts: [{ id: 1, body: 'Foo' }] });
    done();
  });
});
