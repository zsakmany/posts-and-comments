import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import PostListItem from './PostListItem';
import PostListItemToolbar from './PostListItemToolbar';

describe('Post List Item', () => {
  it('renders without crashing', () => {
    const post = {
      body: 'body of the post',
      title: 'title of the post',
      comments: []
    };
    shallow(<PostListItem post={post} />);
  });

  it('renders proper content depending on edit status', () => {
    const post = {
      comments: []
    };
    const wrapper = mount(<PostListItem post={post} />);
    expect(wrapper.containsMatchingElement(<textarea />)).toBe(false);
    expect(wrapper.containsMatchingElement(<p />)).toBe(true);

    wrapper.instance().setState({ isPostUnderEdit: true });
    wrapper.update();
    expect(wrapper.containsMatchingElement(<textarea />)).toBe(true);
    expect(wrapper.containsMatchingElement(<p />)).toBe(false);
  });

  it('uses proper class depending on loading status', () => {
    const post = {
      comments: []
    };
    const wrapper = shallow(<PostListItem post={post} />);
    wrapper.instance().setState({ loading: true });
    wrapper.update();
    expect(wrapper.find('article.postListItem--loading').exists()).toBe(true);
  });

  describe('calls proper callback on', () => {
    it('save click', async done => {
      const post = {
        body: 'body unmodified',
        comments: []
      };
      const spy = sinon.spy();
      const wrapper = shallow(<PostListItem post={post} updatePost={spy} />);
      wrapper.setState({ isPostUnderEdit: true });
      wrapper.update();
      wrapper
        .find('textarea')
        .first()
        .simulate('change', { target: { value: 'some value' } });

      const saveCallback = wrapper
        .find(PostListItemToolbar)
        .first()
        .prop('handleSaveClick');

      await saveCallback();
      expect(spy.callCount).toEqual(1);
      expect(spy.getCall(0).args[0]).toEqual('some value');

      done();
    });

    it('save click when not editing', async done => {
      const post = {
        comments: []
      };
      const spy = sinon.spy();
      const wrapper = shallow(<PostListItem post={post} updatePost={spy} />);
      wrapper.update();

      const saveCallback = wrapper
        .find(PostListItemToolbar)
        .first()
        .prop('handleSaveClick');
      await saveCallback();
      expect(spy.callCount).toEqual(0);

      done();
    });

    it('delete click', async done => {
      const post = {
        comments: []
      };
      const spy = sinon.spy();
      const wrapper = shallow(<PostListItem post={post} deletePost={spy} />);
      wrapper.update();

      const deleteCallback = wrapper
        .find(PostListItemToolbar)
        .first()
        .prop('handleDeleteClick');
      await deleteCallback();
      expect(spy.callCount).toEqual(1);

      done();
    });

    it('toggleComments click', async done => {
      const post = {
        comments: []
      };
      const spy = sinon.spy();
      const wrapper = shallow(<PostListItem post={post} toggleComments={spy} />);
      wrapper.update();

      const toggleCommentsCallback = wrapper
        .find(PostListItemToolbar)
        .first()
        .prop('handleShowCommentClick');
      await toggleCommentsCallback();
      expect(spy.callCount).toEqual(1);

      done();
    });
  });
});
