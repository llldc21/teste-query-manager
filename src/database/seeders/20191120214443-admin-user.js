const bcrypt = require('bcrypt');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Administrador',
          email: 'admin@gympoint.com',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: QueryInterface => {
    return QueryInterface.bulkDelete(
      'Users',
      { email: 'admin@gympoint.com' },
      {}
    );
  },
};
