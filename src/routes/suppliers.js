const router = require('express').Router();
const SuppliersController = require('../app/controllers/SuppliersController');

router.post('/create', SuppliersController.create);

router.get('/list', SuppliersController.list);

router.put('/update/:id', SuppliersController.update);

router.put('/delete/:id', SuppliersController.delete);

module.exports = router;
