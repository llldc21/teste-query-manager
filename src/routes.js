const router = require('express').Router();
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middleware/auth');
const suppliersRoutes = require('./routes/suppliers');

router.post('/session', SessionController.store);

router.use(authMiddleware);

router.use('/suppliers', suppliersRoutes);

module.exports = router;
