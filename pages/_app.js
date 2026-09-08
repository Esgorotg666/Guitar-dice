import '../styles/globals.css';
import '../styles/classroom.css';
import '../styles/theme.css';
import '../styles/genre.css';
import '../styles/locker.css';
import '../styles/diceTray.css';
import WelcomeGate from '../components/WelcomeGate';
import TrafficPing from '../components/TrafficPing';
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <TrafficPing />
      <WelcomeGate />
      <Component {...pageProps} />
    </>
  );
}
