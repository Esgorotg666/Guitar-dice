import { currentUser } from '../../../lib/stripeBilling';
import { logLessonEvent } from '../../../lib/lessonEvents';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'POST only' });
  }
  const user = await currentUser(req);
  if (!user) return res.status(401).json({ message: 'Sign in to log a lesson' });
  const body = req.body || {};
  const result = await logLessonEvent({
    userId: user.id,
    email: user.email,
    username: user.username,
    lessonId: body.lessonId || body.id,
    title: body.title || '',
    style: body.style || '',
    level: body.level || '',
    score: body.score,
    passed: !!body.passed
  });
  return res.status(200).json(result);
}
