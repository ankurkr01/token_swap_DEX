import React from "react";
import "../styles/globals.css";

import merge from "lodash/merge";
import "@rainbow-me/rainbowkit/styles.css";
import {getDefaultWallets, RainbowKitProvider, darkTheme, midnightTheme} from "@rainbow-me/rainbowkit";
import {chain, configureChains, createClient, WagmiConfig} from "wagmi";
import {infuraProvider} from "wagmi/providers/infura";

const {chains, provider} = configureChains(
  [chain.polygonMumbai],
  [
    infuraProvider({
      apiKey:'here goes api key generated from infura',
      priority:1,
    })
  ]
)

const {connectors} = getDefaultWallets({
  appName: 'Custom DEX',
  chains,
})

const wagmiClient = createClient({
  autoConnect:true,
  connectors,
  provider
})

const myTheme = merge(midnightTheme(), {
  colors:{
    accentColor: '#18181b',
    accentColorForeground: '#fff'
  }
});



const MyApp = ({Component, pageProps}) => {
  return (
    <WagmiConfig client = {wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <Component {...pageProps}/>

      </RainbowKitProvider>

    </WagmiConfig>
  )
};

export default MyApp;
