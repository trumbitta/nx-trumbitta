import { join } from 'path';

import open from 'open';
import { open as gitOpen } from 'git-utils';

import { gitpodifyUrl, parseBranchRef, parseOriginUrl } from './utils';

export const cli = async () => {
  const repository = gitOpen(join(__dirname, ''));
  const branch = repository.getUpstreamBranch();
  const origin = repository.getConfigValue('remote.origin.url');

  const url = `${parseOriginUrl(origin)}/${parseBranchRef(branch)}`;
  console.log('open-in-gitpod:', gitpodifyUrl(url));
  await open(gitpodifyUrl(url));
};
