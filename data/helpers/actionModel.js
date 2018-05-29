const db = require('../dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  getActions: function (id) {
    let query = db('actions');

    if (id) {
      return query
        .where('id', id)
        .first()
        .then(action => mappers.actionToBody(action));
    }

    return query.then(actions => {
      return actions.map(action => mappers.actionToBody(action));
    });
  },
  insertAction: function (action) {
    return db('actions')
      .insert(action)
      .then(([id]) => this.get(id));
  },
  updateAction: function (id, changes) {
    return db('actions')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  removeAction: function (id) {
    return db('actions')
      .where('id', id)
      .del();
  },
};
