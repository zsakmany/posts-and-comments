import sinon from 'sinon';

import { BASE_URL } from '../constans';
import { postService } from './PostService';

describe('Post Service', () => {
  const emptyArray = [];

  // @ts-ignore
  const fetchStub = sinon.stub(global, 'fetch');

  afterAll(() => {
    fetchStub.restore();
  });

  beforeEach(() => {
    fetchStub.resetHistory();
    fetchStub.resolves({
      json: () => emptyArray
    });
  });

  it('fetchPosts calls good URL', () => {
    postService.fetchPosts();
    expect(fetchStub.callCount).toEqual(1);
    expect(fetchStub.getCall(0).args[0]).toBe(`${BASE_URL}posts`);
  });

  it('fetchPosts creates post objects with comments', async done => {
    fetchStub.resolves({
      json: () => [{}]
    });
    const result = await postService.fetchPosts();
    expect(result).toEqual([{ comments: [] }]);
    done();
  });

  it('fetchComments calls good URL', () => {
    postService.fetchComments(1);
    expect(fetchStub.callCount).toEqual(1);
    expect(fetchStub.getCall(0).args[0]).toBe(`${BASE_URL}comments?postId=1`);
  });

  it('fetchComments calls json on response', async done => {
    const result = await postService.fetchPosts();
    expect(result).toEqual(emptyArray);
    done();
  });

  it('deletePost calls good URL with good options', () => {
    postService.deletePost(1);

    expect(fetchStub.callCount).toEqual(1);
    expect(fetchStub.getCall(0).args[0]).toBe(`${BASE_URL}posts/1`);
    expect(fetchStub.getCall(0).args[1]).toEqual({ method: 'DELETE' });
  });

  it('updatePost calls good URL', () => {
    postService.updatePost(1, 'updated body');

    expect(fetchStub.callCount).toEqual(1);
    expect(fetchStub.getCall(0).args[0]).toBe(`${BASE_URL}posts/1`);
    expect(fetchStub.getCall(0).args[1]).toEqual({ method: 'PUT', body: '{"body":"updated body"}' });
  });
});
