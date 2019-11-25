const router = require('express').Router();
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middleware/auth');
const suppliersRoutes = require('./routes/suppliers');
const schedulingRoutes = require('./routes/scheduling');

router.post('/session', SessionController.store);

router.use(authMiddleware);

router.use('/suppliers', suppliersRoutes);
router.use('/scheduling', schedulingRoutes);

module.exports = router;
