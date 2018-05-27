TypeError: server.insertProject/etc. not a function
  Description: insertProjectthrew error when running server.js
  Cause: `server.insertProject` refers to the function in `db.js` called `insertProject`, which relies on the helper function `insert` in `projectModel`
  Evidence: renaming `insert` function in `projecModel` to `insertProject` clears error.
  Diagnosis: `server.insertProject` in `server.js` and `insertProject` in `db.js` are improperly named and do not match exported function `insert` in `projectModel.js`
  Fix: refactor function names in `server.js` and `db.js` to conform to function names specified in `projectModel.js`
  Related bugs:
    `db.js`
      getProjects
      getProjectById
      insertProject
      updateProject
      removeProject
      getActions
      getActionById
      insertAction
      updateAction
      removeAction

    in `server.js`:
      server.getProjects
      server.getProjectById
      server.insertProject
      server.updateProject
      server.removeProject
      server.getActions
      server.getActionById
      server.insertAction
      server.updateAction
      server.removeAction