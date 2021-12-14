import log from 'loglevel';
import Wallet from 'ethereumjs-wallet';
// import * as bs58 from 'bs58check';
import { computeAddress, QtumWallet } from 'qtum-ethers-wrapper';
import importers from 'ethereumjs-wallet/thirdparty';
import {
  toBuffer,
  isValidPrivate,
  bufferToHex,
  stripHexPrefix,
} from 'ethereumjs-util';
import wif from 'wif';
import { addHexPrefix } from '../lib/util';

const accountImporter = {
  importAccount(strategy, args) {
    try {
      const importer = this.strategies[strategy];
      const privateKeyHex = importer(...args);
      console.log('[importer]', privateKeyHex);
      return Promise.resolve(privateKeyHex);
    } catch (e) {
      return Promise.reject(e);
    }
  },

  strategies: {
    'Private Key': (privateKey) => {
      if (!privateKey) {
        throw new Error('Cannot import an empty key.');
      }

      // eslint-disable-next-line require-unicode-regexp
      const isBase58 = (value) => /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
      let prefixed;
      let buffer;
      if (isBase58(privateKey)) {
        const pBuffer = wif.decode(privateKey);
        prefixed = `0x${pBuffer.privateKey.toString('hex')}`;
        // const computeAdd = computeAddress(prefixed);
        buffer = toBuffer(prefixed);

        // const qWallet = new QtumWallet(privateKey);

        // // const computeAdd = computeAddress(prefixed2);
        // console.log('[decodedPrivateKey]', qWallet);

        // console.log('[buffer]', this.preferencesController.store.getState());
      } else {
        prefixed = addHexPrefix(privateKey);
        buffer = toBuffer(prefixed);
      }

      if (!isValidPrivate(buffer)) {
        console.log('[buffer]', isValidPrivate(buffer));
        throw new Error('Cannot import invalid private key.');
      }

      const stripped = stripHexPrefix(prefixed);
      return stripped;
    },
    'JSON File': (input, password) => {
      let wallet;
      try {
        wallet = importers.fromEtherWallet(input, password);
      } catch (e) {
        log.debug('Attempt to import as EtherWallet format failed, trying V3');
        wallet = Wallet.fromV3(input, password, true);
      }

      return walletToPrivateKey(wallet);
    },
  },
};

function walletToPrivateKey(wallet) {
  const privateKeyBuffer = wallet.getPrivateKey();
  return bufferToHex(privateKeyBuffer);
}

export default accountImporter;
