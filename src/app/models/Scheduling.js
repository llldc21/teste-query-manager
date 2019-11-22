module.exports = (sequelize, DataTypes) => {
  const Scheduling = sequelize.define('Schedulings', {
    user_id: DataTypes.STRING,
    supplier_id: DataTypes.STRING,
    final_price: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
  });

  return Scheduling;
};
