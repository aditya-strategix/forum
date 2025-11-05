import Post from '../models/Post.js';
import { AIService } from '../services/aiService.js';

export const getAllPosts = async (req, res) => {
  try {
    const { sortBy = 'votes', search = '' } = req.query;
    
    let query = {};
    if (search) {
      query = { 
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } }
        ]
      };
    }

    let sortOptions = {};
    if (sortBy === 'date') {
      sortOptions = { timestamp: -1 };
    } else {
      sortOptions = { votes: -1, timestamp: -1 };
    }

    const posts = await Post.find(query).sort(sortOptions);
    
    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const newPost = new Post({
      title,
      content,
      author: author || 'Anonymous'
    });

    const savedPost = await newPost.save();
    
    // Emit real-time update to all connected clients
    const io = req.app.get('io');
    io.emit('newPost', savedPost);
    
    res.status(201).json({
      success: true,
      data: savedPost,
      message: 'Post created successfully'
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message
    });
  }
};

export const addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Reply content is required'
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const newReply = {
      content,
      author: author || 'Anonymous'
    };

    post.replies.push(newReply);
    const updatedPost = await post.save();
    const addedReply = updatedPost.replies[updatedPost.replies.length - 1];
    
    // Emit real-time update to all clients in this post room
    const io = req.app.get('io');
    io.to(id).emit('newReply', { postId: id, reply: addedReply });
    io.emit('postUpdated', updatedPost);
    
    res.status(201).json({
      success: true,
      data: addedReply,
      message: 'Reply added successfully'
    });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding reply',
      error: error.message
    });
  }
};

export const upvotePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } },
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('postUpdated', post);
    
    res.json({
      success: true,
      data: post,
      message: 'Post upvoted successfully'
    });
  } catch (error) {
    console.error('Error upvoting post:', error);
    res.status(500).json({
      success: false,
      message: 'Error upvoting post',
      error: error.message
    });
  }
};

export const markAsAnswered = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { isAnswered: true },
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('postUpdated', post);
    
    res.json({
      success: true,
      data: post,
      message: 'Post marked as answered'
    });
  } catch (error) {
    console.error('Error marking post as answered:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking post as answered',
      error: error.message
    });
  }
};

export const getSimilarQuestions = async (req, res) => {
  try {
    const { question } = req.query;
    
    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Question parameter is required'
      });
    }

    const allPosts = await Post.find({});
    const similarQuestions = await AIService.findSimilarQuestions(question, allPosts);
    
    res.json({
      success: true,
      data: similarQuestions
    });
  } catch (error) {
    console.error('Error finding similar questions:', error);
    res.status(500).json({
      success: false,
      message: 'Error finding similar questions',
      error: error.message
    });
  }
};

export const getDiscussionSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const summary = await AIService.generateSummary(post.replies);
    
    res.json({
      success: true,
      data: { summary }
    });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating summary',
      error: error.message
    });
  }
};