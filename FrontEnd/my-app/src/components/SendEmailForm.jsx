import React, { useState } from 'react';
import { sendEmail } from '../services/mailService';
const SendEmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendEmail(to, subject, text);
      setMessage('Email envoyé avec succès !');
    } catch (error) {
      setMessage('Échec de l\'envoi de l\'email.');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          To:
          <input type="email" value={to} onChange={(e) => setTo(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Subject:
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Text:
          <textarea value={text} onChange={(e) => setText(e.target.value)} required />
        </label>
      </div>
      <button type="submit">Send Email</button>
      {message && <p>{message}</p>}
    </form>
  );
};
export default SendEmailForm;