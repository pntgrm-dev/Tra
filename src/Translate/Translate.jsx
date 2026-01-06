import { useState } from 'react';

export default function Translate() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const translate = async () => {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        target: 'ja'
      })
    });

    const data = await res.json();
    setResult(data.translatedText);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={translate}>翻訳</button>
      <p>{result}</p>
    </div>
  );
}
