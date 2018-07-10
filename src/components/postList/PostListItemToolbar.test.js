import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PostListItemToolbar from './PostListItemToolbar';

describe('Post List Item Toolbar', () => {
  it('renders without crashing', () => {
    shallow(<PostListItemToolbar />);
  });
  describe('shows proper labels', () => {
    it('when post is not in edit mode', () => {
      const component = shallow(<PostListItemToolbar isPostUnderEdit={false} areCommentsVisible={false} />);
      expect(
        component
          .find('button')
          .first()
          .text()
      ).toEqual('Edit');

      component.setProps({ isPostUnderEdit: true });
      expect(
        component
          .find('button')
          .first()
          .text()
      ).toEqual('Save');
    });

    it('when comments are visible', () => {
      const component = shallow(<PostListItemToolbar isPostUnderEdit={false} areCommentsVisible={false} />);
      expect(
        component
          .find('button')
          .last()
          .text()
      ).toEqual('Show Comments');

      component.setProps({ areCommentsVisible: true });
      expect(
        component
          .find('button')
          .last()
          .text()
      ).toEqual('Hide Comments');
    });
  });

  describe('calls proper callback', () => {
    it('on save click', () => {
      const handleSaveClickSpy = sinon.spy();
      const component = shallow(<PostListItemToolbar handleSaveClick={handleSaveClickSpy} />);
      component
        .find('button')
        .first()
        .simulate('click');
      expect(handleSaveClickSpy.callCount).toEqual(1);
    });

    it('on delete click', () => {
      const handleDeleteClickSpy = sinon.spy();
      const component = shallow(<PostListItemToolbar handleDeleteClick={handleDeleteClickSpy} />);
      component.find('button.btn-danger').simulate('click');
      expect(handleDeleteClickSpy.callCount).toEqual(1);
    });

    it('on show comment click', () => {
      const handleShowCommentClickSpy = sinon.spy();
      const component = shallow(<PostListItemToolbar handleShowCommentClick={handleShowCommentClickSpy} />);
      component
        .find('button')
        .last()
        .simulate('click');
      expect(handleShowCommentClickSpy.callCount).toEqual(1);
    });
  });
});
