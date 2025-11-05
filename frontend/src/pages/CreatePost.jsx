import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Sparkles, Bot } from 'lucide-react';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: user?.name || ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setFormData(prev => ({ ...prev, author: user.name }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      const response = await postService.createPost(formData);
      navigate(`/post/${response.data.data._id}`);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFindSimilarQuestions = async () => {
    if (!formData.title.trim()) return;

    try {
      const response = await postService.getSimilarQuestions(formData.title);
      setSimilarQuestions(response.data.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error finding similar questions:', error);
    }
  };

  const useSuggestion = (suggestion) => {
    setFormData({
      title: suggestion.title,
      content: suggestion.content,
      author: formData.author
    });
    setShowSuggestions(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Discussions</span>
      </Link>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Discussion</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                {formData.title.trim() && (
                  <button
                    type="button"
                    onClick={handleFindSimilarQuestions}
                    className="flex items-center space-x-1 text-sm bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-lg transition-colors"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Find Similar</span>
                  </button>
                )}
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a descriptive title for your question"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Describe your question or topic in detail..."
                rows="8"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* AI Suggestions */}
            {showSuggestions && similarQuestions.length > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-medium text-purple-900 mb-3 flex items-center space-x-2">
                  <Bot className="h-4 w-4" />
                  <span>Similar Questions Found</span>
                </h3>
                <div className="space-y-3">
                  {similarQuestions.map(question => (
                    <div key={question._id} className="bg-white rounded-lg p-3 border border-purple-100">
                      <h4 className="font-medium text-gray-900 mb-2">{question.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{question.content}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {question.replies.length} replies • {question.votes} votes
                        </span>
                        <button
                          type="button"
                          onClick={() => useSuggestion(question)}
                          className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors"
                        >
                          Use This
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuggestions(false)}
                  className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Close Suggestions
                </button>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Link
                to="/"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting || !formData.title.trim() || !formData.content.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;