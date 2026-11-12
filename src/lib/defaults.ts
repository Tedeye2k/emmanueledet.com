// The wording the site uses until you fill in "Site settings" in Sanity.
// Anything you type in Sanity replaces the matching line here.
export const defaults = {
  name: 'Emmanuel Edet',
  role: 'Writer & Creative Strategist',
  eyebrow: "Hello, I'm Emmanuel Edet",
  headline: 'Writer,\n*curious* by\nnature.',
  intro:
    'I help brands say what they mean, through strategy and writing. The rest of the time I make music, research, write about life, analyse markets, and ponder.',
  email: 'emmanueledet2k@gmail.com',
  musicUrl: 'https://resparkit.com/tedeye',
  footerTagline: 'Working everywhere',
  seoDescription:
    'Emmanuel Edet is a writer and creative strategist who helps brands say what they mean. Strategy, writing, music, and notes on books and film.',

  writingTitle: 'Things I’ve *written*.',
  writingIntro:
    'Strategy, SEO, and content marketing work, next to the personal pieces I write because I can’t help it.',
  musicTitle: 'Behind the *music*.',
  musicIntro:
    'I produce and write songs, for myself and for other artists. The full catalogue lives on Resparkit; the credits are below.',
  booksTitle: 'On the *shelf*.',
  booksIntro: 'What I’ve been reading, and whether it was worth the hours.',
  moviesTitle: 'Seen on *screen*.',
  moviesIntro: 'Films I’ve watched, with an honest rating.',
  contactTitle: 'Say *hello*.',
  contactIntro:
    'Got a project, a question, or a record I should hear? Pick whichever way suits you.',
};

export type Settings = typeof defaults;
