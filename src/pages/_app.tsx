import {Web3ReactProvider} from '@web3-react/core';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {IconContext} from 'react-icons';
import '../styles/global.sass';
import styles from '../styles/pages/app.module.sass';
import {getLibrary} from '../lib/web3';
import {chains} from '../constants/config';
import dynamic from 'next/dynamic';

// Dynamically load to circumvent SSR https://github.com/NoahZinsmeister/web3-react/issues/176
const Web3ReactNetworkProvider = dynamic(
  () => import('../components/web3-react-network-provider'),
  {ssr: false}
);

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>BIO AMM DEX</title>
      </Head>
      <IconContext.Provider value={{className: 'reactIcons'}}>
        <Web3ReactNetworkProvider
          getLibrary={getLibrary}
          chain={chains.mainNet}
        >
          <Web3ReactProvider getLibrary={getLibrary}>
            <div className={styles.container}>
              <Component {...pageProps} />
            </div>
          </Web3ReactProvider>
        </Web3ReactNetworkProvider>
      </IconContext.Provider>
    </>
  );
}

export default MyApp;
