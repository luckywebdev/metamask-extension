import {
  QTUM_SYMBOL,
  QTUM_MAINNET_CHAIN_ID,
  QTUM_MAINNET_DISPLAY_NAME,
  QTUM_MAINNET_RPC_URL,
  QTUM_TESTNET_CHAIN_ID,
  QTUM_TESTNET_DISPLAY_NAME,
  QTUM_TESTNET_RPC_URL,
  QTUM_REGTEST_CHAIN_ID,
  QTUM_REGTEST_DISPLAY_NAME,
  QTUM_REGTEST_RPC_URL,
} from '../../shared/constants/network';
/**
 * @typedef {Object} FirstTimeState
 * @property {Object} config Initial configuration parameters
 * @property {Object} NetworkController Network controller state
 */

/**
 * @type {FirstTimeState}
 */
const initialState = {
  config: {},
  PreferencesController: {
    frequentRpcListDetail: [
      {
        rpcUrl: 'http://localhost:8545',
        chainId: '0x539',
        ticker: 'ETH',
        nickname: 'Localhost 8545',
        rpcPrefs: {},
      },
      {
        rpcUrl: QTUM_MAINNET_RPC_URL,
        chainId: QTUM_MAINNET_CHAIN_ID,
        ticker: QTUM_SYMBOL,
        nickname: QTUM_MAINNET_DISPLAY_NAME,
        rpcPrefs: {
          blockExplorerUrl: 'https://qtum.info/',
        },
      },
      {
        rpcUrl: QTUM_TESTNET_RPC_URL,
        chainId: QTUM_TESTNET_CHAIN_ID,
        ticker: QTUM_SYMBOL,
        nickname: QTUM_TESTNET_DISPLAY_NAME,
        rpcPrefs: {
          blockExplorerUrl: 'https://testnet.qtum.info/',
        },
      },
      {
        rpcUrl: QTUM_REGTEST_RPC_URL,
        chainId: QTUM_REGTEST_CHAIN_ID,
        ticker: QTUM_SYMBOL,
        nickname: QTUM_REGTEST_DISPLAY_NAME,
        rpcPrefs: {
          blockExplorerUrl: 'http://localhost:8545',
        },
      },
    ],
  },
};

export default initialState;
