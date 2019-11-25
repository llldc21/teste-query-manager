const router = require('express').Router();
const SchedulingController = require('../app/controllers/SchedulingController');

router.post('/create', SchedulingController.create);
router.get('/list', SchedulingController.list);
router.put('/update/:id', SchedulingController.update);
router.delete('/delete/:id', SchedulingController.delete);

module.exports = router;
