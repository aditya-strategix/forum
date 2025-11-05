import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, Plus, User, LogOut } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { user, logout, isInstructor } = useAuth();

  if (!user) {
    return null; // Don't show header when not logged in
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <MessageSquare className="h-8 w-8" />
            <span className="text-xl font-bold">Learnato Forum</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isInstructor && (
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                Instructor
              </span>
            )}
            
            <Link
              to="/create"
              className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>New Post</span>
            </Link>

            <div className="flex items-center space-x-2">
{user?.avatar && (
  <img 
    src={user.avatar} 
    alt={user.name || "User avatar"} 
    className="h-8 w-8 rounded-full"
  />
)}
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <nav className="mt-4 flex space-x-6">
          <Link
            to="/"
            className={`pb-2 px-1 ${
              location.pathname === '/'
                ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All Discussions
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;