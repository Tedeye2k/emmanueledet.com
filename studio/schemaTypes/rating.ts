// Shared by books and movies: 1 to 5, in half steps.
export const ratingOptions = {
  list: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
  layout: 'radio' as const,
  direction: 'horizontal' as const,
}
