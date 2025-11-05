// Mock AI service for similar questions and summaries
export class AIService {
  static async findSimilarQuestions(question, allPosts) {
    // Simple keyword matching for demo
    // In production, you'd use embeddings or ML models
    const keywords = this.extractKeywords(question);
    
    const similarPosts = allPosts.filter(post => {
      const postKeywords = this.extractKeywords(post.title + ' ' + post.content);
      const commonKeywords = keywords.filter(kw => 
        postKeywords.includes(kw)
      );
      return commonKeywords.length > 0 && commonKeywords.length >= Math.floor(keywords.length / 2);
    });

    return similarPosts.slice(0, 3); // Return top 3 similar
  }

  static async generateSummary(replies) {
    if (replies.length === 0) return 'No replies yet.';
    
    // Simple summary: take first few replies and combine
    const mainPoints = replies.slice(0, 3).map(reply => 
      reply.content.length > 100 ? reply.content.substring(0, 100) + '...' : reply.content
    );
    
    return `Discussion summary: ${mainPoints.join(' ')}`;
  }

  static extractKeywords(text) {
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const stopWords = new Set(['what', 'how', 'why', 'when', 'where', 'which', 'this', 'that', 'these', 'those', 'with']);
    return [...new Set(words.filter(word => !stopWords.has(word)))];
  }
}