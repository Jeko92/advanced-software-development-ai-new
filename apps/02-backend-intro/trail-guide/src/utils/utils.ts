import sanitizeHtml from 'sanitize-html';

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function sanitizePostContent(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      'p',
      'h1',
      'h2',
      'h3',
      'a',
      'ul',
      'ol',
      'li',
      'img',
      'strong',
      'em',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt'],
    },
  });
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
