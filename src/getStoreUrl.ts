type StoreUrlFn = (props: { appId: string; country: string }) => string;

const getIosStoreUrl: StoreUrlFn = ({ appId, country }) => {
  return `https://apps.apple.com/${country}/app/id${appId}`;
};

const getAndroidStoreUrl: StoreUrlFn = ({ appId, country }) => {
  const gl = country.toUpperCase();
  return `https://play.google.com/store/apps/details?id=${appId}&gl=${gl}`;
};

export const getStoreUrl = {
  android: getAndroidStoreUrl,
  ios: getIosStoreUrl,
};
