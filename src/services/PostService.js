import { BASE_URL } from '../constans';

export default class PostService {
  fetchPosts() {
    return fetch(`${BASE_URL}posts`)
      .then(response => response.json())
      .then(posts => posts.slice(0, 20))
      .then(posts =>
        posts.map(p => {
          p.comments = [];
          return p;
        })
      );
  }

  fetchComments(postId) {
    return fetch(`${BASE_URL}comments?postId=${postId}`)
      .then(response => response.json())
      .then(posts => posts.slice(0, 10));
  }

  deletePost(postId) {
    return fetch(`${BASE_URL}posts/${postId}`, {
      method: 'DELETE'
    }).then(response => response.json());
  }

  updatePost(postId, body) {
    return fetch(`${BASE_URL}posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ body })
    }).then(response => response.json());
  }
}

export const postService = new PostService();
