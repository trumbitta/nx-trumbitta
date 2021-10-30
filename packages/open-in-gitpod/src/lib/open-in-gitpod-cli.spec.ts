import { join } from 'path';

import { open as gitOpen } from 'git-utils';
import open from 'open';

import { cli } from './open-in-gitpod';
import { parseBranchRef } from './utils';

jest.mock('open', () => ({
  __esModule: true, // this property makes it work
  default: jest.fn(),
}));

describe('open-in-gitpod: ', () => {
  it('should work', () => {
    const repository = gitOpen(join(__dirname, ''));
    const branch = parseBranchRef(repository.getUpstreamBranch());

    cli();

    expect(open).toHaveBeenCalledWith(`https://gitpod.io/#https://github.com/trumbitta/nx-trumbitta/${branch}`);
  });
});
