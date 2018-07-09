import { BASE_URL } from '../constans';

class PostService {
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
}

export const postService = new PostService();
