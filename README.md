# app-version-checker

`app-version-checker` is a library for checking whether a mobile app is up-to-date or not. It currently supports iOS and Android platforms.

## Installation

`yarn add app-version-checker` or `npm install app-version-checker`

## Usage

`app-version-checker` exports a single function called checkAppVersion that takes an object as its argument. The object should contain the following properties:

`platform` (string): The platform of the app (`"ios"` or `"android"`)
`appId` (string): The app ID for the app you want to check
`currentVersion` (string): The version number of the app you want to compare against
`country` (string): The two-letter country code for the app's store listing
`fetchFn` (function): A function that takes a URL as its argument and returns a Promise that resolves to the response text.

`checkAppVersion` returns a Promise that resolves to an object with the following properties:

`platform` (string): The platform of the app (`"ios"` or `"android"`)
`status` (string): The status of the app (`"out_dated"`, `"up_to_date"`, or `"not_found"`)
`currentVersion` (string|null): The version number of the app on the store, or `null` if the app was not found
`storeUrl` (string): The URL to the app's store listing

Here's an example of how you might use `checkAppVersion`:

```ts
import { checkAppVersion } from 'app-version-checker';
import axios from 'axios';

const fetchFn = async (url) => {
  const { data } = await axios.get(url, { responseType: 'text' });
  return data;
};

const result = await checkAppVersion({
  appId: 'id123456789',
  country: 'us',
  fetchFn,
  currentVersion: '1.0.0',
  platform: 'ios',
});

console.log(result);

// {
//   platform: 'ios',
//   status: 'up_to_date',
//   latestVersion: '1.0.0',
//   storeUrl: 'https://itunes.apple.com/us/app/myapp/id123456789',
// }
```

`app-version-checker` can work with any request library as long as it follows the fetchFn interface. The fetchFn is simply a function that takes a URL as its argument and returns a Promise that resolves to the response text. So, as long as your request library can make HTTP requests and return the response in text format, it should work with `app-version-checker`. Some examples of request libraries that can be used with `app-version-checker` include `node-fetch`, `axios`, and `superagent`.
