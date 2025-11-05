import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    default: 'Anonymous',
    trim: true
  },
  votes: {
    type: Number,
    default: 0
  },
  replies: [{
    content: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      default: 'Anonymous',
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  isAnswered: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for searching and sorting
postSchema.index({ votes: -1, timestamp: -1 });
postSchema.index({ title: 'text', content: 'text', author: 'text' });

export default mongoose.model('Post', postSchema);