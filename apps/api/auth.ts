import { createAuth } from '@keystone-6/auth';

// @see https://keystonejs.com/docs/apis/session#session-api for the session docs
import { statelessSessions } from '@keystone-6/core/session';

let sessionSecret = process.env.SESSION_SECRET;

// Here is a best practice! It's fine to not have provided a session secret in dev,
// however it should always be there in production.
if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production',
    );
  } else {
    sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
  }
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'name',
  secretField: 'password',
  initFirstItem: {
    // If there are no items in the database, keystone will ask you to create
    // a new user, filling in these fields.
    fields: ['name', 'email', 'password'],
  },
});

const sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

// @see https://keystonejs.com/docs/apis/session#session-api
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export { withAuth, session };
