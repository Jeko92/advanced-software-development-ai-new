import slugify from 'slugify';

export function slugifyTitle(title: string): string {
  return slugify(title, { lower: true, strict: true });
}
