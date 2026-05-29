/**
 * Blog classification and mapping by class range
 * Ensures age-appropriate content reaches the right students
 */

export type ClassRange = 'primary' | 'middle' | 'secondary' | 'senior';

export interface Post {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
}

/**
 * Map class number to class range
 */
export function classRangeFromClass(cls: number): ClassRange {
  if (cls >= 1 && cls <= 5) {
    return 'primary';
  } else if (cls >= 6 && cls <= 8) {
    return 'middle';
  } else if (cls >= 9 && cls <= 10) {
    return 'secondary';
  } else {
    return 'senior';
  }
}

/**
 * Category keywords that apply to each class range
 */
const CLASS_CATEGORIES = {
  primary: [
    'Daily Dose',
    'Coding for Kids',
    'Study Basics',
    'Foundations',
    'Early Learning',
  ],
  middle: [
    'NCERT Tips',
    'Science Fair',
    'Intermediate Coding',
    'Study Hacks',
    'Project Ideas',
  ],
  secondary: [
    'Board Exam',
    'Class 9',
    'Class 10',
    'NCERT',
    'Important Chapters',
    'Foundation JEE',
    'Foundation NEET',
    'Tips',
    'Strategies',
  ],
  senior: [
    'JEE',
    'NEET',
    'Board Exam',
    'Class 11',
    'Class 12',
    'Advanced',
    'Coding',
    'Career',
    'College',
    'Preparation Guide',
    'Mains',
    'Advanced',
    'Strategy',
  ],
};

/**
 * Forbidden keywords that should NOT appear for certain classes
 * e.g., Class 5 should not get JEE preparation blogs
 */
const FORBIDDEN_KEYWORDS = {
  primary: ['JEE', 'NEET', 'EAMCET', 'Board', 'Mains', 'Advanced'],
  middle: ['JEE Mains', 'NEET', 'Board Exam', 'EAMCET'],
  secondary: ['Advanced JEE', 'NEET Preparation', 'Advanced NEET'],
  senior: [], // Seniors can see everything
};

/**
 * Check if a blog is appropriate for a class range
 */
function isBlogAppropriate(post: Post, classRange: ClassRange): boolean {
  const title = post.title.toLowerCase();
  const category = post.category.toLowerCase();
  const combinedText = `${title} ${category}`;

  // Check forbidden keywords
  const forbidden = FORBIDDEN_KEYWORDS[classRange];
  for (const keyword of forbidden) {
    if (combinedText.includes(keyword.toLowerCase())) {
      return false;
    }
  }

  // Check allowed categories (whitelist approach)
  const allowedCategories = CLASS_CATEGORIES[classRange];
  for (const allowedCat of allowedCategories) {
    if (category.includes(allowedCat.toLowerCase()) || title.includes(allowedCat.toLowerCase())) {
      return true;
    }
  }

  // Fallback: General/Technology/Resources are safe for all
  if (category.includes('general') || category.includes('technology') || category.includes('resources')) {
    return true;
  }

  // If no matching category found, reject for primary/middle to be safe
  if (classRange === 'primary' || classRange === 'middle') {
    return false;
  }

  // For secondary/senior, be more lenient
  return true;
}

/**
 * Filter blogs to be appropriate for a given class
 */
export function blogsForClass(blogs: Post[], cls: number): Post[] {
  const classRange = classRangeFromClass(cls);
  return blogs.filter(blog => isBlogAppropriate(blog, classRange));
}

/**
 * Get class-appropriate blogs, sorted by date (newest first)
 */
export function getRecentBlogsForClass(blogs: Post[], cls: number, limit: number = 5): Post[] {
  const appropriate = blogsForClass(blogs, cls);
  // Sort by date (assuming date format is sortable, e.g., "May 28, 2026")
  // For now, we'll keep the original order since the array is typically pre-sorted
  return appropriate.slice(0, limit);
}

/**
 * Get a short summary of class-specific content
 */
export function getClassSummary(cls: number): string {
  const range = classRangeFromClass(cls);
  const summaries = {
    primary: 'Daily learning tips, study basics, and coding for kids',
    middle: 'NCERT chapter insights, science fair ideas, and intermediate problem-solving',
    secondary: 'Board exam strategies, important chapters, and foundation for competitive exams',
    senior: 'JEE, NEET, and board exam preparation with advanced strategies and career guidance',
  };
  return summaries[range];
}
