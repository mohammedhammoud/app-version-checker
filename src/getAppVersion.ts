export type GetAppVersionFetchFn = (url: string) => Promise<string>;

type GetVersionFn = (props: {
  appId: string;
  fetchFn: GetAppVersionFetchFn;
}) => Promise<string | null>;

const getIosAppVersion: GetVersionFn = async ({ appId, fetchFn }) => {
  const url = `https://itunes.apple.com/search?term=${appId}&entity=software`;
  const text = await fetchFn(url);
  const data = JSON.parse(text);

  if (data.resultCount > 0) {
    return data.results[0].version;
  }

  return null;
};

const getAndroidAppVersion: GetVersionFn = async ({ appId, fetchFn }) => {
  const url = `https://play.google.com/store/apps/details?id=${appId}&hl=en`;
  const text = await fetchFn(url);
  const pattern = /\[\[\["([\d.]+?)"\]\]/;
  const match = text.match(pattern);

  if (match) {
    return match[1].trim();
  }

  return null;
};

export const getAppVersion = {
  android: getAndroidAppVersion,
  ios: getIosAppVersion,
};
