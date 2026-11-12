// Made-up content, used only for design previews (USE_SAMPLE=1).
// The live site never shows any of this.
let key = 0;
const p = (text: string) => ({
  _type: 'block',
  _key: `k${key++}`,
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: `k${key++}`, text, marks: [] }],
});
const h2 = (text: string) => ({ ...p(text), style: 'h2' });
const quote = (text: string) => ({ ...p(text), style: 'blockquote' });

const body = [
  p('This is sample text so you can judge the layout. Your real writing will replace it the moment you publish from Sanity.'),
  p('Paragraphs sit in a narrow column so lines stay comfortable to read on a laptop and on a phone. Nothing fancy, just room for the words.'),
  h2('A heading inside a piece'),
  p('Headings break long pieces into sections. You can also add links, bold and italic text, lists, and images with captions.'),
  quote('A pulled quote looks like this, for the one line you want people to remember.'),
  p('And then the piece carries on until it ends, where a small note invites the reader to get in touch.'),
];

export const posts = [
  { title: 'Why most brand voices sound the same', slug: 'sample-brand-voices', date: '2026-10-28', category: 'Strategy', excerpt: 'A sample summary. One or two sentences that tell the reader what they will get.', body },
  { title: 'SEO content that people actually finish', slug: 'sample-seo-content', date: '2026-09-14', category: 'SEO', excerpt: 'A sample summary for a second piece, so you can see how a list builds up.', body },
  { title: 'Notes from a year of reading slowly', slug: 'sample-reading-slowly', date: '2026-08-02', category: 'Personal', excerpt: 'A sample summary for a personal essay.', body },
];

export const caseStudies = [
  { title: 'Repositioning a fintech for first-time savers', slug: 'sample-fintech', client: 'Sample Client', role: 'Strategy & copy', year: '2026', excerpt: 'A sample summary: the problem in a sentence, and the result in another.', body },
  { title: 'A content engine for a growing skincare brand', slug: 'sample-skincare', client: 'Another Client', role: 'SEO content', year: '2025', excerpt: 'A sample summary for a second project.', body },
];

export const thoughts = [
  { title: 'On finishing things', slug: 'sample-finishing', date: '2026-11-03', body: body.slice(0, 2) },
  { title: 'The first draft is for you', slug: 'sample-first-draft', date: '2026-10-19', body: body.slice(0, 2) },
  { title: 'What a good brief leaves out', slug: 'sample-brief', date: '2026-10-05', body: body.slice(0, 2) },
];

export const books = [
  { title: 'Sample Book One', by: 'Author Name', rating: 5, note: 'A one-line note about why it stayed with you.' },
  { title: 'A Longer Sample Book Title', by: 'Another Author', rating: 4, note: 'Short and honest.' },
  { title: 'Third Sample', by: 'Author Name', rating: 3 },
  { title: 'Fourth Sample', by: 'Someone Else', rating: 4, note: 'Worth the hours.' },
  { title: 'Fifth Sample', by: 'Author Name', rating: 5 },
];

export const movies = [
  { title: 'Sample Film One', by: 'Director Name', year: '2024', rating: 4, note: 'A one-line note.' },
  { title: 'Second Sample Film', by: 'Another Director', year: '2019', rating: 5, note: 'Watched it twice.' },
  { title: 'Third Film', by: 'Director Name', year: '2022', rating: 3 },
  { title: 'Fourth Film', by: 'Someone Else', year: '2001', rating: 4 },
];
