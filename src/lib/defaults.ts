// The wording the site uses until you fill in "Site settings" in Sanity.
// Anything you type in Sanity replaces the matching line here.
export const defaults = {
  name: 'Emmanuel Edet',
  role: 'Strategy · Writing · SEO',
  eyebrow: "Hello, I'm Emmanuel Edet",
  headline: 'Content & SEO\nstrategist,\n*curious* by\nnature.',
  intro:
    'I help brands say what they mean, and get found for it. The rest of the time I make music and write about life.',
  // Small line under the introduction. Empty = no line.
  proof: 'Currently at Resparkit · Previously Solorosco Web Service',
  email: 'emmanueledet2k@gmail.com',
  musicUrl: 'https://resparkit.com/tedeye',
  // Web3Forms access key. Empty = the email button opens the visitor's email app.
  contactFormKey: 'fca68638-b413-4076-bbc4-e966e629d291',
  footerTagline: 'Working everywhere',
  seoDescription:
    'Emmanuel Edet is a content and SEO strategist who helps brands say what they mean and get found for it. Read his writing or get in touch.',
  // The home page's name in the browser tab and on Google, after your name.
  seoTitle: 'Content & SEO Strategist',

  // The big line at the bottom of the home page.
  ctaLine: 'Have a site that should be\ngetting *more traffic*?',

  writingTitle: 'Things I’ve *written*.',
  writingIntro:
    'Strategy, SEO, and content marketing work, next to the personal pieces I write because I can’t help it.',
  musicTitle: 'Behind the *music*.',
  musicIntro:
    'I produce and write songs, for myself and for other artists. The full catalogue lives on Resparkit; the credits are below.',
  booksTitle: 'On the *shelf*.',
  booksIntro: 'What I’ve been reading, and whether it was worth the hours.',
  moviesTitle: 'Seen on *screen*.',
  moviesIntro: 'Films and series I’ve watched, with an honest rating.',
  contactTitle: 'Say *hello*.',
  contactIntro:
    'Got a project, a question, or a record I should hear? Pick whichever way suits you.',
};

// The "How I work" steps on the home page until they are filled in on Sanity.
export const defaultSteps = [
  { title: 'Research', text: 'I learn the brand, its market and audience, then study the keywords and competitors.', gets: 'A clear picture of what your audience searches for and who you’re up against.' },
  { title: 'Plan', text: 'I turn the research into content pillars and topic clusters, so every piece has a reason to exist.', gets: 'A content plan with priorities.' },
  { title: 'Write', text: 'I write new pieces and refresh old ones that are losing traffic.', gets: 'Content that’s useful to readers and built to rank.' },
  { title: 'Track', text: 'I watch what’s working in Search Console and GA4, then adjust the plan.', gets: 'Regular reporting and a plan that keeps getting sharper.' },
];

// Shown on the Contact page until "Social links" is filled in on Sanity.
export const defaultSocials = [
  { label: 'Instagram', url: 'https://www.instagram.com/thetedeye' },
  { label: 'X', url: 'https://x.com/the_tedeye' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tedeye/' },
];

export type Settings = typeof defaults;
