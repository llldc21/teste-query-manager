const { Supplier } = require('../models/');

class SuppliersController {
  async create(req, res) {
    const { name, email, address, price_hour, capacity } = req.body;
    if (!name || !email || !address || !price_hour || !capacity) {
      return res.status(400).send({ message: 'Invalid request' });
    }
    const response = await Supplier.create({
      name,
      email,
      address,
      price_hour,
      capacity,
    });

    return res.status(201).send({ message: response });
  }

  async list(req, res) {
    const response = await Supplier.findAll({});
    return res.status(200).send({ message: response });
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, address, price_hour, capacity } = req.body;
    if (name || email || address || price_hour || capacity) {
      await Supplier.update(req.body, { where: { id } });
      return res.status(201).send({ message: 'Updated successfuly' });
    }
    return res.status(400).send({ message: 'Invalid request' });
  }

  async delete(req, res) {
    const { id } = req.params;
    await Supplier.destroy({ where: { id } });
    const response = await Supplier.findOne({ where: { id } });
    if (!response) {
      return res.status(201).send({ message: 'Deleted with success' });
    }
    return res.status(400).send({ message: 'Error on delete' });
  }
}

module.exports = new SuppliersController();
