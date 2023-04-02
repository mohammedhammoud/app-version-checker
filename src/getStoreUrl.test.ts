import { getStoreUrl } from './getStoreUrl';

describe('getStoreUrl', () => {
  describe('ios', () => {
    test('returns the correct URL', () => {
      const result = getStoreUrl.ios({ appId: '123', country: 'us' });
      expect(result).toBe('https://apps.apple.com/us/app/id123');
    });
  });

  describe('android', () => {
    test('returns the correct URL', () => {
      const result = getStoreUrl.android({ appId: 'abc', country: 'ca' });
      expect(result).toBe(
        'https://play.google.com/store/apps/details?id=abc&gl=CA'
      );
    });
  });
});
