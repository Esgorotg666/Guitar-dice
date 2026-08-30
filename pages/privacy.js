const CONTACT = 'Chorddice@outlook.com';
const APK_URL = 'https://fjwkfqmyfufulwjecjlf.supabase.co/storage/v1/object/public/guitar-dice-public/guitar-dice-v1.10.0.apk';

export default function Privacy() {
  return (
    <div className="wrap">
      <h1>Guitar Dice</h1>
      <p>
        <a className="btn primary" href="/" style={{ textDecoration:'none' }}>Open the App</a>{' '}
        <a className="btn ghost" href={APK_URL} style={{ textDecoration:'none' }}>Android APK</a>
      </p>
      <h3 style={{ marginTop:30, fontSize:'1.3rem' }}>Privacy Policy</h3>
      <p className="muted sm">Last updated: August 25, 2026</p>
      <p>Guitar Dice (the App) is a guitar practice tool that generates chord progressions, scales, and practice exercises. This policy explains what information we collect and how we use it.</p>
      <h3>Information We Collect</h3>
      <ul>
        <li><b>Account information:</b> If you create an account, we store your username, optional email, and a securely hashed password. We never store your password in plain text.</li>
        <li><b>Usage data:</b> Dice rolls, practice streaks, saved chord progressions and songs, and app preferences, used to provide daily limits, streak rewards, and favorites.</li>
        <li><b>Purchase information:</b> If you buy a subscription, our payment provider (Stripe) processes the transaction. We store only the purchase status and product identifier, never card details.</li>
        <li><b>Sign-in records:</b> We record sign-in attempts and the device type of each active session so we can block brute-force attacks and show you where your account is signed in.</li>
        <li><b>Device identifier:</b> A random device ID may be used to remember free-tier usage without an account.</li>
        <li><b>Local drafts:</b> An unfinished song in the Song Challenge is stored in your own browser so a refresh does not lose it. It is not sent to us until you tap Save.</li>
      </ul>
      <h3>Microphone and the Tuner</h3>
      <p>The tuner asks for microphone permission so it can hear your guitar. Audio is analysed live on your own device to work out the pitch. Nothing from your microphone is recorded, saved, or sent to us or anyone else, and the microphone is released as soon as you stop the tuner.</p>
      <h3>Account Security</h3>
      <p>Passwords are hashed with PBKDF2 (210,000 iterations) and never stored or logged in readable form. Repeated failed sign-ins temporarily lock an account. You can see every device where you are signed in, sign them all out, and change your password at any time from the Account tab. Changing your password signs out every other device.</p>
      <h3>Advertising</h3>
      <p>The Android app displays ads via Google AdMob, which may collect device identifiers and usage data. See <a href="https://policies.google.com/privacy">Google Privacy Policy</a>. Rewarded ads are optional and grant extra dice rolls.</p>
      <h3>What We Do Not Do</h3>
      <ul>
        <li>We do not sell your personal information</li>
        <li>We do not share your data with third parties except the payment and advertising providers named above</li>
        <li>We do not collect precise location data</li>
        <li>We do not record or store microphone audio</li>
      </ul>
      <h3>Data Storage and Security</h3>
      <p>Data is stored with Supabase (hosted on AWS). Session tokens expire after 30 days.</p>
      <h3>Data Deletion</h3>
      <p>You can delete your account and all associated data yourself from the Account tab, which removes it immediately. You can also email <a href={'mailto:' + CONTACT}>{CONTACT}</a> and we will process it within 30 days.</p>
      <h3>Childrens Privacy</h3>
      <p>The App is not directed at children under 13, and we do not knowingly collect personal information from children under 13.</p>
      <h3>Changes to This Policy</h3>
      <p>Changes will be posted at this URL with an updated date.</p>
      <h3>Contact</h3>
      <p><a href={'mailto:' + CONTACT}>{CONTACT}</a></p>
      <footer className="appFoot" style={{ marginTop:36 }}>2026 Guitar Dice</footer>
    </div>
  );
}
