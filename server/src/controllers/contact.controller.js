import { contactService } from '../services/contact.service.js';

export const contactController = {
  async create(req, res) {
    const { website, ...message } = req.validated.body;
    // Honeypot filled → silently accept without storing (don't tell bots they were caught).
    if (website) return res.status(201).json({ success: true, data: { received: true } });

    const data = await contactService.create(message);
    return res.status(201).json({ success: true, data: { received: true, ...data } });
  },
};
