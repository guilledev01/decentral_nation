import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Planetary Lottery" />
          <meta name="application-name" content="Planetary Lottery" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Planetary Lottery" />
          <meta name="apple-mobile-web-app-status-bar" content="#191b1d" />
          <meta name="theme-color" content="#191b1d" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo_256x256.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/logo_256x256.png"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
