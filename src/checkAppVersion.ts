import { compareVersions } from 'compare-versions';

import { GetAppVersionFetchFn, getAppVersion } from './getAppVersion';
import { getStoreUrl } from './getStoreUrl';

export const supportedPlatforms = ['android', 'ios'] as const;

export type Platform = (typeof supportedPlatforms)[number];

enum AppStatus {
  NOT_FOUND = 'not_found',
  OUT_DATED = 'out_dated',
  UP_TO_DATE = 'up_to_date',
}

type AppVersionResponse = {
  latestVersion: string | null;
  platform: Platform;
  status: AppStatus;
  storeUrl: string;
};

type CheckVersionArgs = {
  appId: string;
  country: string;
  currentVersion: string;
  fetchFn: GetAppVersionFetchFn;
  platform: Platform;
};

export const checkAppVersion = async ({
  appId,
  country,
  currentVersion,
  fetchFn,
  platform,
}: CheckVersionArgs): Promise<AppVersionResponse> => {
  if (!supportedPlatforms.includes(platform)) {
    throw new Error('Unsupported platform');
  }

  const latestVersion = await getAppVersion[platform]({ appId, fetchFn });
  const storeUrl = getStoreUrl[platform]({ appId, country });

  let status: AppStatus;

  if (latestVersion) {
    const isOutdated = compareVersions(latestVersion, currentVersion) === 1;
    status = isOutdated ? AppStatus.OUT_DATED : AppStatus.UP_TO_DATE;
  } else {
    status = AppStatus.NOT_FOUND;
  }

  return {
    latestVersion,
    platform,
    status,
    storeUrl,
  };
};
