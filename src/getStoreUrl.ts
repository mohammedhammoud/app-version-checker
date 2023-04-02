type StoreUrlFn = (props: { appId: string }) => string;

const getIosStoreUrl: StoreUrlFn = ({ appId }) => {
  return `https://apps.apple.com/app/${appId}`;
};

const getAndroidStoreUrl: StoreUrlFn = ({ appId }) => {
  return `https://play.google.com/store/apps/details?id=${appId}`;
};

export const getStoreUrl = {
  android: getAndroidStoreUrl,
  ios: getIosStoreUrl,
};
