const router = require('express').Router();
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middleware/auth');

router.post('/session', SessionController.store);

router.use(authMiddleware);

router.get('/providers', (req, res) => {
  return res.status(200).send();
});

module.exports = router;
