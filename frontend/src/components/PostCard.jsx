import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ThumbsUp, CheckCircle } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {post.isAnswered && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            <Link
              to={`/post/${post._id}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {post.title}
            </Link>
          </div>
          
          <p className="text-gray-600 mb-3 line-clamp-2">
            {post.content}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">{post.author}</span>
              <span>{new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{post.votes} votes</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.replies ? post.replies.length : 0} replies</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;