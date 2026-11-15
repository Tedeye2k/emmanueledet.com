import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { toHTML } from '@portabletext/to-html';
import { defaults, defaultSocials, defaultSteps, type Settings } from './defaults';
import * as sample from './sample';

export const projectId = 'ojybom2y';
export const dataset = 'production';

const client = createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: false });
const builder = createImageUrlBuilder({ projectId, dataset });

// USE_SAMPLE=1 fills the site with made-up content for design previews only.
// USE_SAMPLE=empty builds the site as it looks before any content is added.
const useSample = process.env.USE_SAMPLE === '1';
const useEmpty = process.env.USE_SAMPLE === 'empty';

async function fetchOr<T>(groq: string, fallback: T, sampleValue: T): Promise<T> {
  if (useSample) return sampleValue;
  if (useEmpty) return fallback;
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
  client?: string;
  excerpt?: string;
  cover?: any;
  body?: any[];
  /** Set for pieces published on another site: the list links straight there. */
  url?: string;
};

export type ShelfItem = {
  title: string;
  by?: string;
  year?: string;
  cover?: any;
  genre?: string;
  rating?: number;
  note?: string;
  /** "movie" or "series" (Movies page). */
  format?: string;
  /** Seasons watched, for a series. */
  seasons?: string;
  /** A few sentences under the quote (books). */
  summary?: string;
  /** Date watched or finished. */
  date?: string;
  /** Rewatch (movies) or reread (books): "yes", "maybe" or "no". */
  again?: string;
  /** The full review text. Empty when only a one-line note was written. */
  review?: any[];
  /** Set by the site when there is a full review: the end of its page link. */
  slug?: string;
};

export type Credit = {
  title: string;
  artist?: string;
  roles?: string[];
  year?: string;
  url?: string;
};

export type Social = { label: string; url: string };

export async function getSocials(): Promise<Social[]> {
  const saved = await fetchOr<Social[]>(
    `*[_id == "siteSettings"][0].socials[]{ label, url }`,
    [],
    [],
  );
  const filled = saved.filter((item) => item?.label && item?.url);
  return filled.length > 0 ? filled : defaultSocials;
}

export type Step = { title: string; text: string; gets?: string };

export async function getSteps(): Promise<Step[]> {
  const saved = await fetchOr<Step[]>(
    `*[_id == "siteSettings"][0].steps[]{ title, text, gets }`,
    [],
    [],
  );
  const filled = (saved || []).filter((step) => step?.title && step?.text);
  return filled.length > 0 ? filled : defaultSteps;
}

export const getCredits = () =>
  fetchOr<Credit[]>(
    `*[_type == "credit"] | order(year desc, _createdAt desc)
      { title, artist, roles, year, url }`,
    [],
    sample.credits,
  );

export async function getSettings(): Promise<Settings & { showSteps: boolean; showCta: boolean }> {
  const saved = await fetchOr<Record<string, unknown>>(`*[_id == "siteSettings"][0]`, {}, {});
  const merged: any = { ...defaults };
  for (const key of Object.keys(defaults)) {
    const value = saved[key];
    if (typeof value === 'string' && value.trim() !== '') merged[key] = value.trim();
  }
  // On/off switches: only an explicit "off" in Sanity hides a section.
  merged.showSteps = saved.showSteps !== false;
  merged.showCta = saved.showCta !== false;
  if (useSample) merged.contactFormKey = 'preview-only';
  return merged;
}

export const getPosts = () =>
  fetchOr<Entry[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)
      { title, "slug": slug.current, "date": publishedAt, category, client, excerpt, "cover": coverImage, body }`,
    [],
    sample.posts,
  );

const writingFilter = `((_type == "post" && defined(slug.current)) || (_type == "externalPost" && defined(url)))`;
const writingFields = `{ title, "slug": slug.current, "date": publishedAt, category, client, excerpt, url }`;

/** Homepage pieces: up to three switched to "Show on homepage". None switched on = no section. */
export const getSelected = () =>
  fetchOr<Entry[]>(
    `*[${writingFilter} && featured == true] | order(publishedAt desc, _createdAt desc)[0...3] ${writingFields}`,
    [],
    sample.writing.slice(0, 3),
  );

/** Everything for the Writing list: full articles plus links to pieces on other sites, newest first. */
export const getWriting = () =>
  fetchOr<Entry[]>(
    `*[(_type == "post" && defined(slug.current)) || (_type == "externalPost" && defined(url))]
      | order(publishedAt desc, _createdAt desc)
      ${writingFields}`,
    [],
    sample.writing,
  );

const shelfFields = `title, year, genre, rating, note, review`;

/** Gives every item with a full review its own page address, made from its title. */
function withSlugs(items: ShelfItem[]): ShelfItem[] {
  const used = new Set<string>();
  return items.map((item) => {
    if (!item.review?.length) return { ...item, review: undefined };
    const base = slugify(item.title) || 'review';
    let slug = base;
    if (used.has(slug) && item.year) slug = `${base}-${item.year}`;
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
    used.add(slug);
    return { ...item, slug };
  });
}

export const slugify = (text: string) =>
  text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

export const getBooks = async () =>
  withSlugs(await fetchOr<ShelfItem[]>(
    `*[_type == "book"] | order(coalesce(finishedAt, _createdAt) desc)
      { ${shelfFields}, summary, "by": author, cover, "date": finishedAt, "again": reread }`,
    [],
    sample.books,
  ));

export const getMovies = async () =>
  withSlugs(await fetchOr<ShelfItem[]>(
    `*[_type == "movie"] | order(coalesce(watchedAt, _createdAt) desc)
      { ${shelfFields}, format, seasons, "by": director, "cover": poster, "date": watchedAt, "again": rewatch }`,
    [],
    sample.movies,
  ));

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

/** Turns a normal YouTube, Vimeo, Spotify, SoundCloud or Apple Music link into an embed. */
export function embedFor(raw: string): { src: string; kind: 'video' | 'audio'; height?: number } | null {
  let url: URL;
  try { url = new URL(raw); } catch { return null; }
  const host = url.hostname.replace(/^www\.|^m\./, '');
  if (host === 'youtu.be' || host.endsWith('youtube.com')) {
    const id = host === 'youtu.be'
      ? url.pathname.slice(1)
      : url.searchParams.get('v') || url.pathname.match(/\/(?:shorts|embed|live)\/([^/?]+)/)?.[1];
    return id ? { src: `https://www.youtube-nocookie.com/embed/${id}`, kind: 'video' } : null;
  }
  if (host === 'vimeo.com') {
    const id = url.pathname.match(/\/(\d+)/)?.[1];
    return id ? { src: `https://player.vimeo.com/video/${id}`, kind: 'video' } : null;
  }
  if (host === 'open.spotify.com') {
    const m = url.pathname.match(/\/(track|album|playlist|episode|show|artist)\/([A-Za-z0-9]+)/);
    return m ? { src: `https://open.spotify.com/embed/${m[1]}/${m[2]}`, kind: 'audio', height: m[1] === 'track' || m[1] === 'episode' ? 152 : 352 } : null;
  }
  if (host === 'soundcloud.com' || host === 'on.soundcloud.com') {
    const isSet = url.pathname.includes('/sets/');
    return { src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(raw)}&color=%23111111&visual=false`, kind: 'audio', height: isSet ? 450 : 166 };
  }
  if (host === 'music.apple.com') {
    const isSong = url.searchParams.has('i') || url.pathname.includes('/song/');
    return { src: `https://embed.music.apple.com${url.pathname}${url.search}`, kind: 'audio', height: isSong ? 175 : 450 };
  }
  return null;
}

const figcaption = (text?: string) => (text ? `<figcaption>${escapeHtml(text)}</figcaption>` : '');

/** Turns the article text written in Sanity into HTML. */
export function bodyHtml(blocks: any[] | undefined): string {
  if (!blocks?.length) return '';
  return toHTML(blocks, {
    components: {
      marks: {
        highlight: ({ children }: any) => `<mark>${children}</mark>`,
        link: ({ children, value }: any) => {
          const href = typeof value?.href === 'string' ? value.href : '';
          if (!href) return children;
          const external = /^https?:/.test(href);
          return `<a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener"' : ''}>${children}</a>`;
        },
      },
      types: {
        image: ({ value }: any) => {
          const size = ['wide', 'small'].includes(value.size) ? value.size : 'normal';
          const src = imageUrl(value, size === 'wide' ? 2000 : 1400);
          if (!src) return '';
          return `<figure class="fig-${size}"><img src="${src}" alt="${escapeHtml(value.alt || '')}" loading="lazy">${figcaption(value.caption)}</figure>`;
        },
        gallery: ({ value }: any) => {
          const images = (value.images || []).filter((img: any) => img?.asset);
          if (!images.length) return '';
          const items = images
            .map((img: any) => `<img src="${imageUrl(img, 900, 900)}" alt="${escapeHtml(img.alt || '')}" loading="lazy">`)
            .join('');
          return `<figure class="gallery gallery-${Math.min(images.length, 4)}"><div class="gallery-grid">${items}</div>${figcaption(value.caption)}</figure>`;
        },
        dataTable: ({ value }: any) => {
          const rows: string[][] = (value.table?.rows || []).map((r: any) => (r.cells || []).map((c: any) => String(c ?? '')));
          if (!rows.length) return '';
          const width = Math.max(...rows.map((r) => r.length));
          const cell = (tag: string, text: string) => `<${tag}${tag === 'th' ? ' scope="col"' : ''}>${escapeHtml(text)}</${tag}>`;
          const line = (r: string[], tag: string) => `<tr>${Array.from({ length: width }, (_, i) => cell(tag, r[i] || '')).join('')}</tr>`;
          const head = value.headerRow !== false && rows.length > 1 ? `<thead>${line(rows[0], 'th')}</thead>` : '';
          const bodyRows = (head ? rows.slice(1) : rows).map((r) => line(r, 'td')).join('');
          const caption = value.caption ? `<caption>${escapeHtml(value.caption)}</caption>` : '';
          return `<div class="table-wrap" role="region" aria-label="${escapeHtml(value.caption || 'Table')}" tabindex="0"><table>${caption}${head}<tbody>${bodyRows}</tbody></table></div>`;
        },
        embed: ({ value }: any) => {
          if (!value?.url) return '';
          const e = embedFor(value.url);
          if (!e) {
            return `<p class="embed-link"><a href="${escapeHtml(value.url)}" target="_blank" rel="noopener">${escapeHtml(value.caption || value.url)}</a></p>`;
          }
          const title = escapeHtml(value.caption || (e.kind === 'video' ? 'Video' : 'Music player'));
          const frame = e.kind === 'video'
            ? `<div class="embed-video"><iframe src="${e.src}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
            : `<iframe class="embed-audio" src="${e.src}" title="${title}" height="${e.height}" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
          return `<figure class="embed">${frame}${figcaption(value.caption)}</figure>`;
        },
        callout: ({ value }: any) => {
          if (!value?.text) return '';
          const label = value.label ? `<span class="callout-label">${escapeHtml(value.label)}</span>` : '';
          const text = escapeHtml(value.text).replace(/\r?\n/g, '<br>');
          return `<aside class="callout">${label}<p>${text}</p></aside>`;
        },
        button: ({ value }: any) => {
          if (!value?.url || !value?.label) return '';
          const external = /^https?:/.test(value.url);
          return `<p class="prose-btn"><a class="btn-solid" href="${escapeHtml(value.url)}"${external ? ' target="_blank" rel="noopener"' : ''}>${escapeHtml(value.label)}</a></p>`;
        },
        divider: ({ value }: any) => (value?.style === 'dots' ? '<hr class="hr-dots">' : '<hr>'),
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

/** "Resparkit" -> "Written for Resparkit". Empty when no client is set. */
export const writtenFor = (client?: string) => (client?.trim() ? `Written for ${client.trim()}` : '');

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
