import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const blogDir = path.join(process.cwd(), 'blog');
const SLUG_PATTERN = /^[a-z0-9-]+$/i;

export type BlogEntry = {
  slug: string;
  title: string;
};

/**
 * Resolves a slug to an absolute .md path inside blogDir, or null if the
 * slug is not safe to use (rejects path separators, "..", and anything that
 * would resolve outside of blogDir).
 */
function resolvePostPath(slug: string): string | null {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }

  const resolved = path.resolve(blogDir, `${slug}.md`);

  if (!resolved.startsWith(blogDir + path.sep)) {
    return null;
  }

  return resolved;
}

export async function getAllPosts(): Promise<BlogEntry[]> {
  const files = await readdir(blogDir);

  return files.map((file) => {
    const slug = file.replace('.md', '');
    const words = slug.split('-');
    const title = words
      .map((word) => word[0]?.toUpperCase() + word.slice(1))
      .join(' ');

    return {
      slug,
      title,
    };
  });
}

/**
 * Returns the raw markdown content of a post, or null if the slug is
 * invalid or no matching post exists. Rendering markdown to HTML is a
 * presentation concern and is left to the controller/view.
 */
export async function getPostBySlug(slug: string): Promise<string | null> {
  const filepath = resolvePostPath(slug);

  if (!filepath) {
    return null;
  }

  try {
    return await readFile(filepath, 'utf-8');
  } catch {
    return null;
  }
}
