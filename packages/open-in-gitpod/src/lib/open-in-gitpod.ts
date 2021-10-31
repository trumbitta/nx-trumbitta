// Third Parties
import open from 'open';

// Utils
import { gitpodifyUrl, parseOriginUrl } from './utils';
import { getCurrentBranchName, getOriginUrl } from './git-utils';

export const cli = async () => {
  const origin = getOriginUrl();
  const branchName = getCurrentBranchName();

  const url = `${parseOriginUrl(origin)}/${branchName}`;
  const gitpodifiedUrl = gitpodifyUrl(url);

  console.log('open-in-gitpod:', gitpodifiedUrl);
  await open(gitpodifiedUrl);
};
