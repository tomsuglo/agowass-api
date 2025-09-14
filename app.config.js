export default {
  expo: {
    name: "AGOWASS App",
    slug: "AGOWASSapp",
    scheme: "agowassapp",
    experiments: {
      router: {
        root: "src/app",
      },
    },
    extra: {
      eas: {
        projectId: "8cca06aa-aa49-46cc-b846-3daaaeefc6b2",
      },
    }, 
    android: {
      package: "com.agowass.app", // 👈 must be unique (reverse domain style)
      versionCode: 1,             // increment this for every upload to Play Store
    },
    ios: {
      bundleIdentifier: "com.agowass.app", // optional, for iOS
      buildNumber: "1.0.0",
    },
  },
};
