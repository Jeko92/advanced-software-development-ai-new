import fs from 'node:fs/promises';
import path from 'node:path';

const UPLOAD_DIR = path.join(process.cwd(), 'src/assets/img/post-bg');

/**
 * Safely removes an image file from the post-bg directory.
 */
export async function deletePostImage(
  filename: string | undefined,
): Promise<void> {
  if (!filename) return;

  const filePath = path.join(UPLOAD_DIR, filename);

  try {
    await fs.unlink(filePath);
  } catch (err) {
    // Ignore error if file was already deleted or missing (ENOENT)
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error(`Failed to delete old image ${filename}:`, err);
    }
  }
}
