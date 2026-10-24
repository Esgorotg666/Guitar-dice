import '../styles/globals.css';
import '../styles/classroom.css';
import '../styles/theme.css';
import '../styles/genre.css';
import '../styles/locker.css';
import '../styles/diceTray.css';
import WelcomeGate from '../components/WelcomeGate';
import TrafficPing from '../components/TrafficPing';
import PiAuth from '../components/PiAuth';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <PiAuth />
      <TrafficPing />
      <WelcomeGate />
      <Component {...pageProps} />
    </>
  );
}
