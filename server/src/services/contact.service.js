import { ContactMessage } from '../models/ContactMessage.js';

export const contactService = {
  /** Stores a contact message. Email notification will be added with the email provider. */
  async create({ name, email, subject, message }) {
    const doc = await ContactMessage.create({ name, email, subject, message });
    return { id: doc._id.toString(), receivedAt: doc.createdAt.toISOString() };
  },
};
