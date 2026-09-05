import { displayNameFor } from '../lib/familyGrant';
import { DAD_LINE, quoteForDay } from '../lib/forestNotes';

export default function WelcomeBanner(props) {
  const name = displayNameFor(props.user);
  if (!name) return null;
  const quote = quoteForDay();

  return (
    <div className="card" style={{ marginBottom: 12, borderColor: '#35c46b' }}>
      <h3 style={{ margin: '0 0 6px' }}>Welcome Forest</h3>
      <p style={{ margin: '0 0 8px', fontStyle: 'italic' }}>{quote}</p>
      <p className="okText sm" style={{ margin: 0 }}>{DAD_LINE}</p>
    </div>
  );
}
