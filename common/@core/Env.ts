const BE_URL = 'http://162.0.211.102:4400'; // server
// const BE_URL = 'http://192.168.1.151:4400'; // local
// const BE_URL = 'http://192.168.1.154:4400'; // local

const START_PLATFORM = 'IOS';

const Env = {
  API_URL: BE_URL,
  API_HOST: BE_URL.substring(0, BE_URL.lastIndexOf(':')),
  API_IP: BE_URL.substring(BE_URL.lastIndexOf('/') + 1, BE_URL.lastIndexOf(':')),
  API_PORT: Number(BE_URL.substring(BE_URL.lastIndexOf(':') + 1, BE_URL.length)),

  OPENAI_API_KEY: 'key_123',
  OPENAI_LENGH_HISTORY_TO_SAVE_MEMORY: 20,
  START_PLATFORM,
  IS_START_PLATFORM_IOS: START_PLATFORM && START_PLATFORM === 'IOS',
  REVENUE_CAT_PUBLIC_API_KEY: 'appl_PoJDNMcxFFdUVWSDYjdMmfSTDUy',
}

export default Env;
