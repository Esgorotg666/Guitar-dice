import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    console.log('Guitar Dice home');
  }, []);
  return (
    <div style={{ padding: 20, color: '#fff', background: '#070b10', minHeight: '100vh' }}>
      <h1>Guitar Dice</h1>
      <p>Pi Network integration active.</p>
    </div>
  );
}
