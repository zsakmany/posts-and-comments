import sinon from 'sinon';

import { BASE_URL } from '../constans';
import { postService } from './PosrtService';

describe('Post Service fetch', () => {
  const emptyArray = [];

  // @ts-ignore
  const fetchStub = sinon.stub(global, 'fetch');
  fetchStub.resolves({
    json: () => emptyArray
  });

  afterAll(() => {
    fetchStub.restore();
  });

  afterEach(() => {
    fetchStub.resetHistory();
  });

  it('fetchPosts calls good URL', () => {
    postService.fetchPosts();
    expect(fetchStub.callCount).toEqual(1);
    expect(fetchStub.getCall(0).args[0]).toBe(`${BASE_URL}posts`);
  });

  it('fetchPosts calls json on response', async done => {
    const result = await postService.fetchPosts();
    expect(result).toEqual(emptyArray);
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
