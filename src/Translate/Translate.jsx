import { useState } from 'react';

export default function Translate() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const translate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target: 'ja' })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Translate failed');
      }

      setResult(data.translatedText);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={translate} disabled={loading}>
        {loading ? '翻訳中…' : '翻訳'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <p>{result}</p>}
    </div>
  );
}
