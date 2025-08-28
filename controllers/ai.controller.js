// controllers/ai.controller.js
const { getAIResponse } = require('../services/ai.service');

async function chatWithAI(req, res) {
  try {
    const { room, message } = req.body;
    if (!room || !message)
      return res.status(400).json({ error: 'Missing room or message' });

    const aiResponse = await getAIResponse(room, message);

    res.json({ response: aiResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI request failed' });
  }
}

module.exports = { chatWithAI };
