import React, { useState, useEffect } from 'react';
import { postService } from '../services/api';
import { useSocket } from '../contexts/SocketContext';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import { Filter, Loader, RefreshCw } from 'lucide-react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('votes');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    fetchPosts();
  }, [sortBy, searchQuery]);

  useEffect(() => {
    if (!socket) return;

    const handleNewPost = (newPost) => {
      setPosts(prev => {
        // Avoid duplicates
        if (prev.find(post => post._id === newPost._id)) {
          return prev;
        }
        return [newPost, ...prev];
      });
    };

    const handlePostUpdated = (updatedPost) => {
      setPosts(prev => prev.map(post => 
        post._id === updatedPost._id ? updatedPost : post
      ));
    };

    const handleNewReply = (data) => {
      setPosts(prev => prev.map(post => {
        if (post._id === data.postId) {
          return {
            ...post,
            replies: [...post.replies, data.reply]
          };
        }
        return post;
      }));
    };

    socket.on('newPost', handleNewPost);
    socket.on('postUpdated', handlePostUpdated);
    socket.on('newReply', handleNewReply);

    return () => {
      socket.off('newPost', handleNewPost);
      socket.off('postUpdated', handlePostUpdated);
      socket.off('newReply', handleNewReply);
    };
  }, [socket]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getAllPosts(sortBy, searchQuery);
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading discussions...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Discussion Forum</h1>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <SearchBar onSearch={handleSearch} />
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="votes">Most Voted</option>
              <option value="date">Latest</option>
            </select>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery ? 'No posts found matching your search.' : 'No discussions yet. Be the first to start one!'}
            </p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;