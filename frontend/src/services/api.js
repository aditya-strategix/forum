import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postService = {
  getAllPosts: (sortBy = 'votes', search = '') => 
    api.get(`/posts?sortBy=${sortBy}&search=${search}`),

  getPostById: (id) => 
    api.get(`/posts/${id}`),
  
  createPost: (postData) => 
    api.post('/posts', postData),
  
  addReply: (postId, replyData) => 
    api.post(`/posts/${postId}/reply`, replyData),
  
  upvotePost: (postId) => 
    api.post(`/posts/${postId}/upvote`),
  
  markAsAnswered: (postId) => 
    api.patch(`/posts/${postId}/answered`),
  
  getSimilarQuestions: (question) => 
    api.get(`/posts/similar?question=${encodeURIComponent(question)}`),
  
  getDiscussionSummary: (postId) => 
    api.get(`/posts/${postId}/summary`)
};

// Mock authentication service
export const authService = {
  login: (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          email,
          name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=3B82F6&color=fff`
        };
        resolve({ data: { user } });
      }, 1000);
    });
  }
};

export default api;