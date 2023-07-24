import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

const getInitialProps = createGetInitialProps();
declare let window: any;

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html>
        <Head>
          {/* Google Tag Manager */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZVG93323N6" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-ZVG93323N6');`,
            }}
          />
          {/* End Google Tag Manager */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
