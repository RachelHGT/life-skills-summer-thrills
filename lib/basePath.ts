export const BASE_PATH =
  process.env.NODE_ENV === 'production' ? '/life-skills-summer-thrills' : '';

export const asset = (path: string) => `${BASE_PATH}${path}`;
