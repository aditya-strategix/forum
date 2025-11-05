export const setupSocket = (app,io) => {
  io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);

    socket.on('joinPost', (postId) => {
      socket.join(postId);
      console.log(`User ${socket.id} joined post ${postId}`);
    });

    socket.on('leavePost', (postId) => {
      socket.leave(postId);
      console.log(`User ${socket.id} left post ${postId}`);
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ User disconnected:', socket.id, 'Reason:', reason);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  });

  // Make io accessible to routes
  app.set('io', io);
};