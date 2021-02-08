import express from 'express';

import { showPolls, createPoll, usersPolls, getPoll, deletePoll, vote } from '../controllers/poll.js';
import auth from '../middlewares/auth.js';

const router = express.Router();


router.get('/', showPolls);
router.post('/', auth, createPoll);

router.get('/user', auth, usersPolls);

router.get('/:id', getPoll);
router.post('/:id', auth, vote);
router.delete('/:id', auth, deletePoll);

export default router;
