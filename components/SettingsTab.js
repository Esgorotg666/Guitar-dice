import { A4_PRESETS, THEMES } from '../lib/appSettings';
import { TUNINGS } from '../lib/theory';
import { useState } from 'react';

const MAIL = 'midnightmechanix@icloud.com';
const TOPICS = ['Question', 'Lesson feedback', 'Bug', 'Billing', 'Idea'];

export default function SettingsTab(props) {
  const s = props.settings || {};
  const [topic, setTopic] = useState('Question');
  const [body, setBody] = useState('');
  const [sent, setSent] = useState('');

  function patch(part) {
    if (props.onChange) props.onChange(Object.assign({}, s, part));
  }

  function sendMail() {
    const text = String(body || '').trim();
    if (!text) { setSent('Write a short note first.'); return; }
    const user = props.user && props.user.username ? props.user.username : 'guest';
    const subject = encodeURIComponent('Guitar Dice - ' + topic + ' - ' + user);
    const msg = encodeURIComponent(
      text + '\n\n---\nUser: ' + user +
      '\nStyle: ' + (props.style || '') +
      '\nTheme: ' + (s.theme || '') +
      '\nPage: guitar-dice.vercel.app'
    );
    window.location.href = 'mailto:' + MAIL + '?subject=' + subject + '&body=' + msg;
    setSent('Opening your mail app...');
  }

  return (
    <div>
      <div className="card">
        <h3>Display</h3>
        <p className="muted sm">Dark is the default. Light is easier outdoors. System follows the phone.</p>
        <div className="optRow">
          {THEMES.map(function (t) {
            return <button key={t.id} className={'chipBtn' + (s.theme === t.id ? ' on' : '')} onClick={function () { patch({ theme: t.id }); }}>{t.label}</button>;
          })}
        </div>
      </div>

      <div className="card">
        <h3>Metronome default</h3>
        <p className="muted sm">Tools opens at this tempo. You can still nudge BPM while it is running.</p>
        <div className="bpmRow">
          <button className="btn ghost sm" onClick={function () { patch({ bpm: Math.max(40, (s.bpm || 90) - 5) }); }}>-</button>
          <div className="bpmVal"><strong>{s.bpm || 90}</strong><span>BPM</span></div>
          <button className="btn ghost sm" onClick={function () { patch({ bpm: Math.min(240, (s.bpm || 90) + 5) }); }}>+</button>
        </div>
        <input className="slider" type="range" min={40} max={240} value={s.bpm || 90}
          onChange={function (e) { patch({ bpm: Number(e.target.value) }); }} />
      </div>

      <div className="card">
        <h3>Tuner</h3>
        <span className="optLabel">Reference A</span>
        <div className="optRow">
          {A4_PRESETS.map(function (n) {
            return <button key={n} className={'chipBtn' + (s.a4 === n ? ' on' : '')} onClick={function () { patch({ a4: n }); }}>{n} Hz</button>;
          })}
        </div>
        <span className="optLabel">Preset</span>
        <div className="optRow">
          {TUNINGS.map(function (t) {
            return <button key={t.id} className={'chipBtn' + (s.tuningId === t.id ? ' on' : '')} onClick={function () { patch({ tuningId: t.id }); }}>{t.label}</button>;
          })}
        </div>
      </div>

      {props.children}

      <div className="card">
        <h3>Contact us</h3>
        <p className="muted sm">Questions, lesson notes, or something that feels off. Opens your mail app to {MAIL}.</p>
        <span className="optLabel">Topic</span>
        <div className="optRow">
          {TOPICS.map(function (t) {
            return <button key={t} className={'chipBtn' + (topic === t ? ' on' : '')} onClick={function () { setTopic(t); }}>{t}</button>;
          })}
        </div>
        <label className="fieldLabel">Message</label>
        <textarea className="field" rows={5} value={body} onChange={function (e) { setBody(e.target.value); setSent(''); }}
          placeholder="What should we look at?" />
        <button className="btn primary wide" onClick={sendMail}>Open email</button>
        {sent ? <p className="muted sm" style={{ marginTop:8 }}>{sent}</p> : null}
      </div>
    </div>
  );
}
