// Third Parties
import open from 'open';

// Utils
import { getCurrentBranchName } from './git-utils';

import { cli } from './open-in-gitpod';

jest.mock('open', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('open-in-gitpod: ', () => {
  it('should work', async () => {
    const branchName = getCurrentBranchName();

    await cli();

    expect(open).toHaveBeenCalledWith(`https://gitpod.io/#https://github.com/trumbitta/nx-trumbitta/${branchName}`);
  });
});
