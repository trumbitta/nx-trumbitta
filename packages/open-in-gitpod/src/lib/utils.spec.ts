import { gitpodifyUrl, parseBranchRef, parseOriginUrl } from './utils';

describe('utils: ', () => {
  const parsedUrl = 'https://github.com/foo/bar/baz';

  describe('parseOriginUrl: ', () => {
    it('should work with a SSH git url', () => {
      expect(parseOriginUrl('git@github.com:foo/bar/baz.git')).toEqual(parsedUrl);
    });

    it('should work with a HTTPS git url', () => {
      expect(parseOriginUrl('https://github.com/foo/bar/baz')).toEqual(parsedUrl);
    });
  });

  describe('parseBranchRef: ', () => {
    it('should extract the branch name from the complete ref', () => {
      expect(parseBranchRef('refs/heads/main')).toEqual('main');
    });

    it('should be resilient when the branch is null', () => {
      expect(parseBranchRef(null)).toEqual('');
    });
  });

  describe('gitpodifyUrl: ', () => {
    it('should replace the repository url with the Gitpod url', () => {
      expect(gitpodifyUrl(parsedUrl)).toEqual(`https://gitpod.io/#${parsedUrl}`);
    });
  });
});
