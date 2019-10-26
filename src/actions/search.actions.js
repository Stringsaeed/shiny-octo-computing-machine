import {SEARCH} from '~/constants';

export const search = (term, fields, modelName) => ({
  type: SEARCH,
  meta: {
    term: term,
    fields: fields,
    modelName: modelName,
  },
});
