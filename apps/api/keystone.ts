// @see https://keystonejs.com/docs/apis/config
import { config } from '@keystone-6/core';

import { lists } from './schema';
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: process.env.DB_URI!,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  }),
);
