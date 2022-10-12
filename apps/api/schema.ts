import { list } from '@keystone-6/core';
// @see https://keystonejs.com/docs/apis/fields#fields-api
import { text, password } from '@keystone-6/core/fields';

import { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['name'],
      },
    },
  }),
};
