// Third Parties
import open from 'open';
import { Repository } from 'nodegit';

// Utils
import { gitpodifyUrl, parseOriginUrl } from './utils';

export const cli = async () => {
  const thisRepoPath = process.cwd();
  const repository = await Repository.open(thisRepoPath);

  const origin = (await repository.getRemote('origin')).url();

  const branchReference = await repository.getCurrentBranch();
  const branchName = branchReference.shorthand();

  const url = `${parseOriginUrl(origin)}/${branchName}`;
  const gitpodifiedUrl = gitpodifyUrl(url);

  console.log('open-in-gitpod:', gitpodifiedUrl);
  await open(gitpodifiedUrl);
};
