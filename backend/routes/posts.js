import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  addReply,
  upvotePost,
  markAsAnswered,
  getSimilarQuestions,
  getDiscussionSummary
} from '../controllers/postController.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/similar', getSimilarQuestions);
router.get('/:id', getPostById);
router.get('/:id/summary', getDiscussionSummary);
router.post('/', createPost);
router.post('/:id/reply', addReply);
router.post('/:id/upvote', upvotePost);
router.patch('/:id/answered', markAsAnswered);

export default router;