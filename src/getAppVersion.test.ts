import { getAppVersion } from './getAppVersion';

import fs from 'fs';
import path from 'path';

const getMockResponse = (platform: 'android' | 'ios') => {
  const filepath = path.join(
    __dirname,
    '..',
    '__response_mocks__',
    `${platform}.txt`
  );
  return fs.readFileSync(filepath, 'utf8');
};

describe('getAppVersion', () => {
  describe('ios', () => {
    const fetchFn = async () => Promise.resolve(getMockResponse('ios'));

    test('returns the app version if it exists', async () => {
      const result = await getAppVersion.ios({ appId: '123', fetchFn });
      expect(result).toBe('1.106.0');
    });

    test('returns null if the app version does not exist', async () => {
      const result = await getAppVersion.ios({
        appId: '123',
        fetchFn: () => Promise.resolve('{}'),
      });
      expect(result).toBeNull();
    });
  });

  describe('android', () => {
    const fetchFn = async () => Promise.resolve(getMockResponse('android'));

    test('returns the app version if it exists', async () => {
      const result = await getAppVersion.android({ appId: 'abc', fetchFn });
      expect(result).toBe('1.106.1');
    });

    test('returns null if the app version does not exist', async () => {
      const result = await getAppVersion.android({
        appId: 'def',
        fetchFn: () => Promise.resolve(''),
      });
      expect(result).toBeNull();
    });
  });
});
