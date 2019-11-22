const { Supplier } = require('../models/');

class SessionController {
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

    return res.status(201).send({ message: JSON.stringify(response) });
  }

  async list(req, res) {
    const response = await Supplier.findAll({});
    return res.status(200).send({ message: JSON.stringify(response) });
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, address, price_hour, capacity } = req.body;
    if (name || email || address || price_hour || capacity) {
      const response = await Supplier.update(req.body, { where: { id } });
      return res.status(201).send({ message: JSON.stringify(response) });
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

module.exports = new SessionController();
