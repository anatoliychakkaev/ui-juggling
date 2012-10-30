load('application');

before(identifyModel);
before(loadModel, {only: ['show', 'edit', 'update', 'destroy']});
before(fixJSON, {only: ['create', 'update']});

action('new', function () {
    this.title = 'New model';
    this.model = new this.Model;
    render();
});

action(function create() {
    this.Model.create(req.body[this.modelName], function (err, model) {
        if (err) {
            flash('error', 'Model can not be created');
            render('new', {
                model: model,
                title: 'New model'
            });
        } else {
            flash('info', 'Model created');
            redirect(path_to.models());
        }
    });
});

action(function index() {
    this.title = 'Models index';
    this.Model.all(function (err, models) {
        render({
            models: models
        });
    });
});

action(function show() {
    this.title = 'View details of ' + this.modelName;
    render();
});

action(function edit() {
    this.title = 'Edit ' + this.modelName;
    render();
});

action(function update() {
    this.model.updateAttributes(body[this.modelName], function (err) {
        if (!err) {
            flash('info', 'Model updated');
            redirect(pathTo.model(this.modelName, this.model));
        } else {
            flash('error', 'Model can not be updated');
            this.title = 'Edit model details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.model.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy ' + params.model);
        } else {
            flash('info', params.model + ' successfully removed');
        }
        send("'" + pathTo.models(params.model) + "'");
    });
});

function identifyModel() {
    var Model = this.Model = railway.models[params.model];
    this.modelName = params.model;
    this.schema = Object.keys(railway.models);
    if (!Model) {
        send(404, this.modelName + ' model definition not found');
    } else {
        this.properties = Model.schema.definitions[this.modelName].properties;
        next();
    }
}

function fixJSON() {
    Object.keys(this.properties).forEach(function (p) {
        var val = body[this.modelName][p];
        if (this.properties[p].type.name === 'JSON' && val) {
            try {
                body[this.modelName][p] = JSON.parse(val);
            } catch (e) {
                this.title = 'Unable to save ' + this.modelName;
                if (!this.model) {
                    this.model = new this.Model(body[this.modelName]);
                }
                this.model.errors = {};
                this.model.errors[p] = ['Could not parse JSON: ' + e.message];
            }
        }
    }.bind(this));
    if (this.model.errors) {
        render(this.model.id ? 'edit' : 'new');
    }
    next();
}

function loadModel() {
    this.Model.find(params.id, function (err, model) {
        if (err || !model) {
            redirect(path_to.models());
        } else {
            this.model = model;
            next();
        }
    }.bind(this));
}

