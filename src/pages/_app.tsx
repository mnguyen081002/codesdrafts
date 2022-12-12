import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Component } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <main>
    <Component {...pageProps} />
  </main>
);

export default MyApp;
