// The wording the site uses until you fill in "Site settings" in Sanity.
// Anything you type in Sanity replaces the matching line here.
export const defaults = {
  name: 'Emmanuel Edet',
  role: 'Writer & Creative Strategist',
  eyebrow: "Hello, I'm Emmanuel Edet",
  headline: 'Writer,\n*curious* by\nnature.',
  intro:
    'I help brands say what they mean, in strategy, SEO content, and case studies people actually finish. The rest of the time I write about life, books, music, and film.',
  email: 'emmanueledet2k@gmail.com',
  musicUrl: 'https://resparkit.com/tedeye',
  footerTagline: 'Working everywhere',
  seoDescription:
    'Emmanuel Edet is a writer and creative strategist. Strategic writing, SEO content, case studies, and personal pieces on life, books, music, and film.',

  writingTitle: 'Things I’ve *written*.',
  writingIntro:
    'Strategy, SEO, and content marketing work, next to the personal pieces I write because I can’t help it.',
  caseStudyTitle: 'Problems, *solved*.',
  caseStudyIntro:
    'What the brief was, what I did about it, and what changed afterwards.',
  thoughtsTitle: 'Thinking *out loud*.',
  thoughtsIntro: 'Short notes and half-finished ideas. Some of them grow up to be essays.',
  booksTitle: 'On the *shelf*.',
  booksIntro: 'What I’ve been reading, and whether it was worth the hours.',
  moviesTitle: 'Seen on *screen*.',
  moviesIntro: 'Films I’ve watched, with an honest rating.',
};

export type Settings = typeof defaults;
