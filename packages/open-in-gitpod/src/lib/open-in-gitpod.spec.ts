// Third Parties
import open from 'open';
import { Repository } from 'nodegit';

import { cli } from './open-in-gitpod';

jest.mock('open', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('open-in-gitpod: ', () => {
  it('should work', async () => {
    const thisRepoPath = process.cwd();
    const repository = await Repository.open(thisRepoPath);
    const branchReference = await repository.getCurrentBranch();
    const branchName = branchReference.shorthand();

    await cli();

    expect(open).toHaveBeenCalledWith(`https://gitpod.io/#https://github.com/trumbitta/nx-trumbitta/${branchName}`);
  });
});
