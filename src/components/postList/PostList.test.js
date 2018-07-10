import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PostList from './PostList';
import PostListItem from './PostListItem';

describe('PostList component', () => {
  const postService = {
    fetchPosts: sinon.stub(),
    deletePost: sinon.stub(),
    updatePost: sinon.stub(),
    fetchComments: sinon.stub()
  };

  beforeEach(() => {
    postService.fetchPosts.reset();
    postService.deletePost.reset();
    postService.updatePost.reset();
    postService.fetchComments.reset();
  });

  it('renders without crashing', () => {
    shallow(<PostList postService={postService} />);
  });

  it('calls fetchPosts', async done => {
    postService.fetchPosts.resolves([{}]);
    const wrapper = shallow(<PostList postService={postService} />);
    await wrapper.instance().componentDidMount();
    expect(postService.fetchPosts.callCount).toBe(1);

    done();
  });

  it('renders a Post component for each entry in the response', async done => {
    postService.fetchPosts.resolves([{}, {}]);
    const wrapper = shallow(<PostList postService={postService} />);
    await wrapper.instance().componentDidMount();

    wrapper.update();
    expect(wrapper.text()).toBe('<PostListItem /><PostListItem />');

    done();
  });

  it('deletes post', async done => {
    postService.fetchPosts.resolves([{ id: 1, comments: [] }, { id: 2, comments: [] }]);
    const wrapper = shallow(<PostList postService={postService} />);
    await wrapper.instance().componentDidMount();
    wrapper.update();
    const deleteCallback = wrapper
      .find(PostListItem)
      .first()
      .prop('deletePost');

    await deleteCallback();
    expect(postService.deletePost.callCount).toEqual(1);
    expect(wrapper.state()).toEqual({ posts: [{ id: 2, comments: [] }] });

    done();
  });

  it('updates post', async done => {
    postService.fetchPosts.resolves([{ id: 1, body: '', comments: [] }]);
    const wrapper = shallow(<PostList postService={postService} />);
    await wrapper.instance().componentDidMount();
    wrapper.update();

    const updateCallback = wrapper
      .find(PostListItem)
      .first()
      .prop('updatePost');

    await updateCallback('Foo');
    expect(postService.updatePost.callCount).toEqual(1);
    expect(wrapper.state()).toEqual({ posts: [{ id: 1, body: 'Foo', comments: [] }] });

    done();
  });

  it('toggle comments', async done => {
    postService.fetchPosts.resolves([{ id: 1, comments: [] }]);
    postService.fetchComments.resolves(['comment1', 'comment2']);
    const wrapper = shallow(<PostList postService={postService} />);
    await wrapper.instance().componentDidMount();
    wrapper.update();

    const toggleCommentsCallback = wrapper
      .find(PostListItem)
      .first()
      .prop('toggleComments');

    expect(wrapper.state()).toEqual({ posts: [{ id: 1, comments: [] }] });

    await toggleCommentsCallback();
    expect(postService.fetchComments.callCount).toEqual(1);
    expect(wrapper.state()).toEqual({ posts: [{ id: 1, comments: ['comment1', 'comment2'] }] });

    await toggleCommentsCallback();
    expect(wrapper.state()).toEqual({ posts: [{ id: 1, comments: [] }] });

    done();
  });
});
