import Post from '../models/Post.js';

export const seedSampleData = async () => {
  try {
    // Check if data already exists
    const postCount = await Post.countDocuments();
    if (postCount > 0) {
      console.log('✅ Database already has data, skipping seed');
      return;
    }

    // Create sample posts
    const samplePosts = [
      {
        title: 'How do I deploy Node.js on Cloud Run?',
        content: 'I\'m trying to deploy my Node.js application to Google Cloud Run but keep getting build errors. The Dockerfile seems correct but the build fails during npm install. Any suggestions for troubleshooting this?',
        author: 'Rohan',
        votes: 5,
        replies: [
          {
            content: 'Use gcloud CLI with region flag: gcloud run deploy --region us-central1 --source .',
            author: 'Alex',
            timestamp: new Date('2023-10-01T10:00:00Z')
          },
          {
            content: 'Make sure to enable Cloud Build first in your project! Also check your billing is set up properly.',
            author: 'Sarah',
            timestamp: new Date('2023-10-01T11:30:00Z')
          },
          {
            content: 'Check your .dockerignore file - sometimes it excludes necessary files for the build.',
            author: 'Mike',
            timestamp: new Date('2023-10-01T14:15:00Z')
          }
        ],
        timestamp: new Date('2023-10-01T09:00:00Z'),
        isAnswered: false
      },
      {
        title: 'Best practices for React component structure?',
        content: 'What are the current best practices for organizing React components in a large application? Should I use atomic design, feature-based folders, or something else?',
        author: 'Maya',
        votes: 3,
        replies: [
          {
            content: 'I recommend using feature-based folder structure and keeping components small and focused. Also consider using React Query for server state.',
            author: 'John',
            timestamp: new Date('2023-10-02T15:00:00Z')
          },
          {
            content: 'Atomic design works well for design systems, but for business applications, feature-based organization is more maintainable.',
            author: 'Lisa',
            timestamp: new Date('2023-10-02T16:30:00Z')
          }
        ],
        timestamp: new Date('2023-10-02T14:20:00Z'),
        isAnswered: true
      },
      {
        title: 'Tailwind CSS vs traditional CSS?',
        content: 'What are the advantages of using Tailwind CSS compared to traditional CSS frameworks like Bootstrap? I\'m starting a new project and can\'t decide.',
        author: 'David',
        votes: 2,
        replies: [
          {
            content: 'Tailwind gives you more control and smaller bundle sizes, but has a learning curve. Bootstrap is quicker to start with.',
            author: 'Emma',
            timestamp: new Date('2023-10-03T09:45:00Z')
          }
        ],
        timestamp: new Date('2023-10-03T08:15:00Z'),
        isAnswered: false
      },
      {
        title: 'MongoDB aggregation pipeline performance tips?',
        content: 'My MongoDB aggregation queries are running slowly on large datasets. What are some best practices for optimizing aggregation pipeline performance?',
        author: 'TechLead',
        votes: 4,
        replies: [
          {
            content: 'Use $match early in the pipeline to reduce documents, and create proper indexes for the fields you\'re matching on.',
            author: 'DBA_Expert',
            timestamp: new Date('2023-10-04T11:20:00Z')
          },
          {
            content: 'Also consider using $project to limit fields and $sort only when necessary. Avoid $lookup on large collections if possible.',
            author: 'MongoGuru',
            timestamp: new Date('2023-10-04T13:45:00Z')
          }
        ],
        timestamp: new Date('2023-10-04T10:00:00Z'),
        isAnswered: false
      }
    ];

    await Post.insertMany(samplePosts);
    console.log('✅ Sample data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding sample data:', error);
  }
};