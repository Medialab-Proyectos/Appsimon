import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.appsimon.app',
  appName: 'App Simon',
  webDir: 'out',
  server: {
    url: 'https://appsimon.vercel.app/',
    cleartext: true
  }
};

export default config;
