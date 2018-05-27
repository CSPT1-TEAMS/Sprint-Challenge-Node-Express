function getActions() {
  return db('actions');
}

function getActionById(id) {
  return db('actions').where({ id: Number(id) });
}

function insertAction(action) {
  return db('actions')
    .insert(action)
    .then(ids => ({ id: ids[0] }));
}

function updateAction(id, action) {
  return db('actions')
    .where('id', Number(id))
    .update(action);
}

function removeAction(id) {
  return db('actions')
    .where('id', Number(id))
    .del();
}