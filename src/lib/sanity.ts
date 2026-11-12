import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { toHTML } from '@portabletext/to-html';
import { defaults, type Settings } from './defaults';
import * as sample from './sample';

export const projectId = 'ojybom2y';
export const dataset = 'production';

const client = createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false });
const builder = createImageUrlBuilder({ projectId, dataset });

// USE_SAMPLE=1 fills the site with made-up content for design previews only.
const useSample = process.env.USE_SAMPLE === '1';

async function fetchOr<T>(groq: string, fallback: T, sampleValue: T): Promise<T> {
  if (useSample) return sampleValue;
  try {
    const result = await client.fetch(groq);
    return (result ?? fallback) as T;
  } catch (err: any) {
    // A brand-new project may not have its dataset yet: build an empty site.
    if (err?.statusCode === 404) {
      console.warn(`[sanity] dataset "${dataset}" not found, building with no content`);
      return fallback;
    }
    throw err;
  }
}

export type Entry = {
  title: string;
  slug: string;
  date?: string;
  category?: string;
  excerpt?: string;
  client?: string;
  role?: string;
  year?: string;
  cover?: any;
  body?: any[];
};

export type ShelfItem = {
  title: string;
  by?: string;
  year?: string;
  cover?: any;
  rating?: number;
  note?: string;
};

export async function getSettings(): Promise<Settings> {
  const saved = await fetchOr<Record<string, unknown>>(`*[_id == "siteSettings"][0]`, {}, {});
  const merged: any = { ...defaults };
  for (const key of Object.keys(defaults)) {
    const value = saved[key];
    if (typeof value === 'string' && value.trim() !== '') merged[key] = value;
  }
  return merged;
}

export const getPosts = () =>
  fetchOr<Entry[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)
      { title, "slug": slug.current, "date": publishedAt, category, excerpt, "cover": coverImage, body }`,
    [],
    sample.posts,
  );

export const getCaseStudies = () =>
  fetchOr<Entry[]>(
    `*[_type == "caseStudy" && defined(slug.current)] | order(year desc, _createdAt desc)
      { title, "slug": slug.current, client, role, year, "excerpt": summary, "cover": coverImage, body }`,
    [],
    sample.caseStudies,
  );

export const getThoughts = () =>
  fetchOr<Entry[]>(
    `*[_type == "thought" && defined(slug.current)] | order(publishedAt desc)
      { title, "slug": slug.current, "date": publishedAt, body }`,
    [],
    sample.thoughts,
  );

export const getBooks = () =>
  fetchOr<ShelfItem[]>(
    `*[_type == "book"] | order(coalesce(finishedAt, _createdAt) desc)
      { title, "by": author, cover, rating, note }`,
    [],
    sample.books,
  );

export const getMovies = () =>
  fetchOr<ShelfItem[]>(
    `*[_type == "movie"] | order(coalesce(watchedAt, _createdAt) desc)
      { title, "by": director, year, "cover": poster, rating, note }`,
    [],
    sample.movies,
  );

/** Image address on Sanity's image servers, or null when there is no image. */
export function imageUrl(source: any, width: number, height?: number): string | null {
  if (!source?.asset) return null;
  let image = builder.image(source).width(width).auto('format').fit('crop');
  if (height) image = image.height(height);
  return image.url();
}

export function imageAlt(source: any, fallback = ''): string {
  return typeof source?.alt === 'string' && source.alt ? source.alt : fallback;
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Turns the article text written in Sanity into HTML. */
export function bodyHtml(blocks: any[] | undefined): string {
  if (!blocks?.length) return '';
  return toHTML(blocks, {
    components: {
      types: {
        image: ({ value }: any) => {
          const src = imageUrl(value, 1400);
          if (!src) return '';
          const caption = value.caption ? `<figcaption>${escapeHtml(value.caption)}</figcaption>` : '';
          return `<figure><img src="${src}" alt="${escapeHtml(value.alt || '')}" loading="lazy">${caption}</figure>`;
        },
      },
    },
  });
}

/** "Writer,\n*curious* by\nnature." -> safe HTML with line breaks and italics. */
export function richLine(text: string): string {
  return escapeHtml(text)
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(/\r?\n/g, '<br>');
}

export const plainLine = (text: string) => text.replace(/\*/g, '').replace(/\s*\r?\n\s*/g, ' ');

export function formatDate(value?: string): string {
  if (!value) return '';
  const date = new Date(value);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/** Adds the right prefix so links work on both github.io and the real domain. */
export function link(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
