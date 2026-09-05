import { Html, Head, Main, NextScript } from 'next/document';

const AVANT_SRC = 'http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=cc541d53f4a80b0e684e927f407f35c5db9519d0';
const ADSENSE = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4798049989357665';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Guitar Dice" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#070b10" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@300..800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          async
          src={ADSENSE}
          crossOrigin="anonymous"
        />
        <script type="text/javascript" src={AVANT_SRC} />
      </Head>
      <body>
        <script type="text/javascript" src={AVANT_SRC} />
        <div
          id="avantlink-confirm"
          hidden
          dangerouslySetInnerHTML={{
            __html:
              '<!-- ' + AVANT_SRC + ' -->' +
              '<script type="text/javascript" src="' + AVANT_SRC + '"></script>' +
              AVANT_SRC +
              ' authResponse=cc541d53f4a80b0e684e927f407f35c5db9519d0'
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
