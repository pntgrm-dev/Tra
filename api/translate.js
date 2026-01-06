export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "POST only" });
  }

  const { text, target } = req.body;

  if (!text) {
    return res.status(400).json({ message: "text is required" });
  }

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target: target || "ja",
        }),
      }
    );

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;

    res.status(200).json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
