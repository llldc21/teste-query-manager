const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Schedulings } = require('../models/');
const { Supplier } = require('../models/');
const SchedulingMiddleware = require('../middleware/scheculingMiddleware');

class SchedulingController {
  async create(req, res) {
    try {
      const { authorization } = req.headers;
      const token = authorization.split(' ');
      const tokenDecoded = jwt.decode(token[1]);

      const { supplier_id, start_date, end_date } = req.body;

      if (!supplier_id || !start_date || !end_date) {
        return res.status(400).send({ message: 'Invalid request' });
      }

      const supplier = await Supplier.findOne({ where: { id: supplier_id } });
      if (!supplier) {
        return res.status(404).send({ message: 'Supplier not found' });
      }

      const data = {};
      data.user_id = tokenDecoded.id;
      data.supplier_id = supplier_id;
      data.final_price = await SchedulingMiddleware.calcFinalPrice(
        start_date,
        end_date,
        supplier
      );
      data.start_date = JSON.stringify(moment(new Date(start_date)));
      data.end_date = JSON.stringify(moment(new Date(end_date)));

      const response = await Schedulings.create(data).catch(error => {
        return res.status(500).send({ message: error.message });
      });

      return res.status(201).send({ message: response });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async list(req, res) {
    const response = await Schedulings.findAll({});
    return res.status(200).send({ message: response });
  }

  async update(req, res) {
    const { id } = req.params;
    const { supplier_id, start_date, end_date } = req.body;

    if (supplier_id || start_date || end_date) {
      if (supplier_id) {
        const supplier = await Supplier.findOne({ where: { id: supplier_id } });
        if (!supplier) {
          return res.status(404).send({ message: 'Supplier not found' });
        }
      }
      await Schedulings.update(req.body, { where: { id } });
      return res.status(201).send({ message: 'Updated successfuly' });
    }
    return res.status(400).send({ message: 'Invalid request' });
  }

  async delete(req, res) {
    const { id } = req.params;
    await Schedulings.destroy({ where: { id } });
    const response = await Schedulings.findOne({ where: { id } });
    if (!response) {
      return res.status(201).send({ message: 'Deleted with success' });
    }
    return res.status(400).send({ message: 'Error on delete' });
  }
}

module.exports = new SchedulingController();
