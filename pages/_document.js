import { Html, Head, Main, NextScript } from 'next/document';

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
        {/* Temporary AvantLink verification — exact strings from their email */}
        <script type="text/javascript" src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&application_id=1646617" />
        <script type="text/javascript" src="https://classic.avantlink.com/affiliate_app_confirm.php?mode=js&application_id=1646617" />
      </Head>
      <body>
        <script type="text/javascript" src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&application_id=1646617" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
