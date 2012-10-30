exports.routes = function draw(map) {
    map.get(':model', 'models#index', {as: 'models'});
    map.put(':model/:id', 'models#update');
    map.del(':model/:id', 'models#destroy');
    map.get(':model/:id', 'models#show', {as: 'model'});
    map.get(':model/:id/edit', 'models#edit', {as: 'editModel'});
    map.post(':model', 'models#create');
    map.post(':model/new', 'models#new', {as: 'newModel'});
};

