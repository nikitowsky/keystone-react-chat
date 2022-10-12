import { setupTestRunner } from '@keystone-6/core/testing';

import config from '../keystone';

const runner = setupTestRunner({ config });

describe('User entity', () => {
  it(
    'Can create user',
    runner(async ({ context }) => {
      const person = await context.query.User.createOne({
        data: {
          name: 'test',
          email: 'test@example.com',
          password: 'test-strong-password',
        },
        query: 'id name email password { isSet }',
      });

      expect(person.name).toEqual('test');
      expect(person.email).toEqual('test@example.com');
      expect(person.password.isSet).toEqual(true);
    }),
  );
});
