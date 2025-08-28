const { sendToAI } = require('../services/ai.service');

// Placeholder walidatora
function canSendToAI(user, message) {
  // np. jeśli room nie jest tavern, zwróć false
  return user.room === 'tavern';
}

async function handleAIMessage(user, message, io) {
  if (!canSendToAI(user, message)) return;

  try {
    // próbujemy pobrać odpowiedź AI
    const aiText = await sendToAI(message);

    io.to(user.room).emit('message', {
      user: 'tavern-keeper',
      text: aiText,
    });
  } catch (err) {
    console.error('AI error:', err);

    // fallback – jeśli AI zawiedzie, wysyłamy flavour text
    io.to(user.room).emit('message', {
      user: 'tavern-keeper',
      text: 'Karczmarz chyba wyszedł gdzieś na zaplecze, przy barze pusto… 🤷‍♂️',
    });
  }
}

module.exports = { handleAIMessage, canSendToAI };
