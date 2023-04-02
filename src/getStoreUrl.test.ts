import { getStoreUrl } from './getStoreUrl';

describe('getStoreUrl', () => {
  describe('ios', () => {
    test('returns the correct URL', () => {
      const result = getStoreUrl.ios({ appId: '123' });
      expect(result).toBe('https://apps.apple.com/app/123');
    });
  });

  describe('android', () => {
    test('returns the correct URL', () => {
      const result = getStoreUrl.android({ appId: 'abc' });
      expect(result).toBe('https://play.google.com/store/apps/details?id=abc');
    });
  });
});
