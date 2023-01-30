import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content="Decentral Nation" />
          <meta
            property="og:description"
            content="Welcome to Decentral Nation, where we decentralize your business and ensure its future. Request a quote for your project today and let's build the future together!"
          />
          <meta property="og:image" content="/logo.png" />
          <meta name="robots" content="all" />
          <meta
            name="keywords"
            content="decentral nation, decentral, web3, dapp, decentralized application, software factory, build blockchain, blockchain developer, web3 developer, developers"
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
