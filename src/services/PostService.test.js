import sinon from 'sinon';

import { BASE_URL } from '../constans';
import { postService } from './PosrtService';

const emptyArray = [];

// @ts-ignore
const fetchStub = sinon.stub(global, 'fetch');
fetchStub.resolves({
  json: () => emptyArray
});

describe('Post Service', () => {
  afterAll(() => {
    fetchStub.restore();
  });

  afterEach(() => {
    fetchStub.resetHistory();
  });

  it('PostService fetchPosts calls good URL', () => {
    postService.fetchPosts();
    expect(fetchStub.callCount).toEqual(1);
    expect(fetchStub.getCall(0).args[0]).toBe(`${BASE_URL}posts`);
  });

  it('PostService fetchPosts calls json on response', done => {
    const postServicePromise = postService.fetchPosts();
    postServicePromise.then(result => {
      expect(result).toEqual(emptyArray);
      done();
    });
  });

  it('PostService fetchComments calls good URL', () => {
    postService.fetchComments(1);
    expect(fetchStub.callCount).toEqual(1);
    expect(fetchStub.getCall(0).args[0]).toBe(`${BASE_URL}comments?postId=1`);
  });

  it('PostService fetchComments calls json on response', done => {
    const postServicePromise = postService.fetchPosts();
    postServicePromise.then(result => {
      expect(result).toEqual(emptyArray);
      done();
    });
  });
});
