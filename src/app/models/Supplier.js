module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    price_hour: DataTypes.STRING,
    capacity: DataTypes.STRING,
  });

  return Supplier;
};
