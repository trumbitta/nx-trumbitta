// Utils
import { getRepoRoot, getOriginUrl, getCurrentBranchName } from './git-utils';

describe('git-utils: ', () => {
  describe('getRepoRoot: ', () => {
    it('should return the root of the current repository', () => {
      const thisRepoPath = getRepoRoot();

      expect(thisRepoPath).toEqual(process.cwd());
    });
  });

  describe('getOriginUrl', () => {
    it('should return the URL of the origin remote', () => {
      const originUrl = getOriginUrl();

      expect(originUrl).toContain('github.com');
      expect(originUrl).toContain('nx-trumbitta');
    });
  });

  // Not working in Github Actions 🤷🏻
  describe.skip('getCurrentBranchName', () => {
    it('should return the name of the current branch', () => {
      expect(getCurrentBranchName()).not.toEqual('');
    });
  });
});
