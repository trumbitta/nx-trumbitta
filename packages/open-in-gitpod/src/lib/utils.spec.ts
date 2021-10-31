// Utils
import { gitpodifyUrl, parseOriginUrl } from './utils';

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

  describe('gitpodifyUrl: ', () => {
    it('should replace the repository url with the Gitpod url', () => {
      expect(gitpodifyUrl(parsedUrl)).toEqual(`https://gitpod.io/#${parsedUrl}`);
    });
  });
});
