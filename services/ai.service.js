// services/ai.service.js

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Funkcja do wysyłania promptu do OpenRouter AI
async function sendToAI(prompt) {
  console.log('send to ai func');
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is not set');
  }
  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI request failed: ${errorText}`);
  }

  const data = await response.json();
  // zakładam, że OpenRouter zwraca messages w data.choices[0].message.content
  return data.choices?.[0]?.message?.content || '';
}

// Placeholder walidator requestów do AI
function validateAIRequest(message) {
  // 🔹 Możesz dodać później logikę filtrowania treści, limity itp.
  return true;
}

module.exports = {
  sendToAI,
  validateAIRequest,
};
