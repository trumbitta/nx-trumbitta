export const parseOriginUrl = (origin: string): string => {
  const matches = origin.match(
    /^(?:git@|http:\/\/|https:\/\/){1}((?:([a-z0-9]\.|[a-z0-9][a-z0-9-]{0,61}[a-z0-9])\.)+)([a-z0-9]{2,63}|(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]))\.?(?::|\/){1}(.*)/,
  ) ?? [''];
  const [, , base, tld, path] = matches;
  const url = `https://${base}.${tld}/${path}`.split('.git')[0];

  return url;
};

export const parseBranchRef = (branch: string | null): string => {
  return branch ? branch.split('/').slice(-1)[0] : '';
};

export const gitpodifyUrl = (url: string): string => {
  return `https://gitpod.io/#${url}`;
};
