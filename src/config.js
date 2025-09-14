// src/config.js
const ENV = {
  dev: {
    API_URL: "https://agowass-api.onrender.com",   // local dev machine
  },
  prod: {
    API_URL: "https://agowass-api.onrender.com",   // production server
  },
};

// Auto switch based on environment
const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev; // when running locally
  } else {
    return ENV.prod; // in production build
  }
};

export default getEnvVars();
