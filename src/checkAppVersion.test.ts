import { checkAppVersion } from './checkAppVersion';
import { GetAppVersionFetchFn, getAppVersion } from './getAppVersion';
import { getStoreUrl } from './getStoreUrl';

jest.mock('./getAppVersion');
jest.mock('./getStoreUrl');

describe('checkAppVersion', () => {
  const appId = 'test-app-id';

  const fetchFn: GetAppVersionFetchFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (getStoreUrl.android as jest.Mock).mockReturnValue(
      'https://play.google.com/store/apps/details?id=test-app-id'
    );
    (getStoreUrl.ios as jest.Mock).mockReturnValue(
      'https://itunes.apple.com/us/app/test-app-id'
    );
  });

  it('should throw an error for an unsupported platform', async () => {
    await expect(
      checkAppVersion({
        appId,
        currentVersion: '1.0.0',
        fetchFn,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        platform: 'unsupported-platform' as any,
      })
    ).rejects.toThrow('Unsupported platform');
  });

  it('should return the correct response for a not found app', async () => {
    (getAppVersion.android as jest.Mock).mockResolvedValue(null);
    const response = await checkAppVersion({
      appId,
      currentVersion: '1.0.0',
      fetchFn,
      platform: 'android',
    });
    expect(response.platform).toEqual('android');
    expect(response.status).toEqual('not_found');
    expect(response.latestVersion).toEqual(null);
    expect(response.storeUrl).toEqual(
      'https://play.google.com/store/apps/details?id=test-app-id'
    );
  });

  describe('android', () => {
    it('should return the correct response for Android with an outdated app', async () => {
      (getAppVersion.android as jest.Mock).mockResolvedValue('2.0.0');
      const response = await checkAppVersion({
        appId,
        currentVersion: '1.9.0',
        fetchFn,
        platform: 'android',
      });
      expect(response.platform).toEqual('android');
      expect(response.status).toEqual('out_dated');
      expect(response.latestVersion).toEqual('2.0.0');
      expect(response.storeUrl).toEqual(
        'https://play.google.com/store/apps/details?id=test-app-id'
      );
    });
  });

  describe('ios', () => {
    it('should return the correct response for iOS with an up-to-date app', async () => {
      (getAppVersion.ios as jest.Mock).mockResolvedValue('1.2.0');
      const response = await checkAppVersion({
        appId,
        currentVersion: '1.2.0',
        fetchFn,
        platform: 'ios',
      });
      expect(response.platform).toEqual('ios');
      expect(response.status).toEqual('up_to_date');
      expect(response.latestVersion).toEqual('1.2.0');
      expect(response.storeUrl).toEqual(
        'https://itunes.apple.com/us/app/test-app-id'
      );
    });
  });
});
