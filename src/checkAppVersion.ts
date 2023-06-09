import { compareVersions } from 'compare-versions';

import { GetAppVersionFetchFn, getAppVersion } from './getAppVersion';
import { getStoreUrl } from './getStoreUrl';

export const supportedPlatforms = ['android', 'ios'] as const;

export type Platform = (typeof supportedPlatforms)[number];

export enum AppStatus {
  NOT_FOUND = 'not_found',
  OUTDATED = 'outdated',
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
  currentVersion: string;
  fetchFn: GetAppVersionFetchFn;
  platform: Platform;
};

export const checkAppVersion = async ({
  appId,
  currentVersion,
  fetchFn,
  platform,
}: CheckVersionArgs): Promise<AppVersionResponse> => {
  if (!supportedPlatforms.includes(platform)) {
    throw new Error('Unsupported platform');
  }

  const latestVersion = await getAppVersion[platform]({ appId, fetchFn });
  const storeUrl = getStoreUrl[platform]({ appId });

  let status: AppStatus;

  if (latestVersion) {
    const isOutdated = compareVersions(latestVersion, currentVersion) === 1;
    status = isOutdated ? AppStatus.OUTDATED : AppStatus.UP_TO_DATE;
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
