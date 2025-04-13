// api/config.js

let config = null;

export const loadConfig = async () => {
  if (!config) {
    const response = await fetch('/config.json');
    config = await response.json();
  }
  return config;
};

export const getConfig = () => {
  if (!config) {
    throw new Error("Config not loaded yet.");
  }
  return config;
};
