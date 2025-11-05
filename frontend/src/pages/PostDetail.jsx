import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { postService } from '../services/api';
import { useSocket } from '../contexts/SocketContext';
import { ArrowLeft, ThumbsUp, CheckCircle, MessageCircle, User, Sparkles, Bot } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();
  const { isInstructor } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [summary, setSummary] = useState('');
  const [showAI, setShowAI] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!socket || !post) return;

    socket.emit('joinPost', post._id);

    const handleNewReply = (data) => {
      if (data.postId === post._id) {
        setPost(prev => ({
          ...prev,
          replies: [...prev.replies, data.reply]
        }));
      }
    };

    const handlePostUpdated = (updatedPost) => {
      if (updatedPost._id === post._id) {
        setPost(updatedPost);
      }
    };

    socket.on('newReply', handleNewReply);
    socket.on('postUpdated', handlePostUpdated);

    return () => {
      if (post) {
        socket.emit('leavePost', post._id);
      }
      socket.off('newReply', handleNewReply);
      socket.off('postUpdated', handlePostUpdated);
    };
  }, [socket, post]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postService.getPostById(id);
      setPost(response.data.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    try {
      const response = await postService.upvotePost(id);
      setPost(response.data.data);
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const handleAddReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      setSubmitting(true);
      await postService.addReply(id, { content: replyContent });
      setReplyContent('');
    } catch (error) {
      console.error('Error adding reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAsAnswered = async () => {
    try {
      const response = await postService.markAsAnswered(id);
      setPost(response.data.data);
    } catch (error) {
      console.error('Error marking as answered:', error);
    }
  };

  const handleFindSimilarQuestions = async () => {
    try {
      const response = await postService.getSimilarQuestions(post.title + ' ' + post.content);
      setSimilarQuestions(response.data.data);
      setShowAI(true);
    } catch (error) {
      console.error('Error finding similar questions:', error);
    }
  };

  const handleGenerateSummary = async () => {
    try {
      const response = await postService.getDiscussionSummary(id);
      setSummary(response.data.data.summary);
      setShowAI(true);
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading post...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Post not found.</p>
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mt-4 inline-block">
          Back to Discussions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Discussions</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {post.isAnswered && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
                </div>
                
                <p className="text-gray-700 whitespace-pre-wrap mb-4">{post.content}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <span>{new Date(post.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleUpvote}
                className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>Upvote ({post.votes})</span>
              </button>

              {isInstructor && !post.isAnswered && (
                <button
                  onClick={handleMarkAsAnswered}
                  className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Mark as Answered</span>
                </button>
              )}

              <button
                onClick={handleFindSimilarQuestions}
                className="flex items-center space-x-1 bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Sparkles className="h-4 w-4" />
                <span>Similar Questions</span>
              </button>

              {post.replies.length > 0 && (
                <button
                  onClick={handleGenerateSummary}
                  className="flex items-center space-x-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  <Bot className="h-4 w-4" />
                  <span>AI Summary</span>
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Replies ({post.replies ? post.replies.length : 0})</span>
            </h2>

            <div className="space-y-4 mb-6">
              {!post.replies || post.replies.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No replies yet. Be the first to respond!</p>
              ) : (
                post.replies.map(reply => (
                  <div key={reply._id || reply.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-2 whitespace-pre-wrap">{reply.content}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{reply.author}</span>
                      <span>•</span>
                      <span>{new Date(reply.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAddReply}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                required
              />
              <button
                type="submit"
                disabled={submitting || !replyContent.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Posting...' : 'Post Reply'}
              </button>
            </form>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-1">
          {showAI && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Bot className="h-5 w-5 text-purple-500" />
                <span>AI Assistant</span>
              </h3>

              {similarQuestions.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Similar Questions</h4>
                  <div className="space-y-3">
                    {similarQuestions.map(question => (
                      <div key={question._id} className="bg-gray-50 rounded-lg p-3">
                        <Link 
                          to={`/post/${question._id}`}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium block mb-1"
                        >
                          {question.title}
                        </Link>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {question.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {summary && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Discussion Summary</h4>
                  <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">
                    {summary}
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowAI(false)}
                className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;