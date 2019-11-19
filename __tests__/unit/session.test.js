const { User } = require('../../src/app/models');

describe('Authentication', () => {
  it('shold sum two numbers ', async () => {
    const user = await User.create({
      name: 'Lucas Lima',
      email: 'llldc@gmail.com',
      password_hash: '123456789',
    });

    expect(user.name).toBe('Lucas Lima');
  });
});
