import { Router } from 'express';
import { getDatabaseStatus } from '../config/db.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      uptime: Math.round(process.uptime()),
      database: getDatabaseStatus(),
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
