## Install

    npm install ui-juggling

## Use as sub-app

    var db = require('ui-juggling')();
    db.railway.models = schema.models;
    parentapp.use('/db-view', db);

    // schema - jugglingdb schema (it will be app.models in railway 1.0 apps)
    // parent app is any express/connect/railway app

## Contribution

Fork, pull request. Any crazy ideas are welcome at this stage. We are trying to
build decent tool for managing jugglingdb models.

## LICENSE

MIT
