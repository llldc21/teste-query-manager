const moment = require('moment');

class SchedulingMiddleware {
  async calcFinalPrice(startDate, endDate, supplier) {
    try {
      startDate = moment(new Date(startDate));
      endDate = moment(new Date(endDate));

      if (endDate < startDate) {
        throw new Error('Start date is less than end date');
      }
      const priceHour = supplier.price_hour;
      const diffHours = moment(endDate).diff(startDate, 'hours');
      const res = (priceHour * diffHours) / 100;
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new SchedulingMiddleware();
