const Event = require('../models/event');

function createRoute(req,res,next){
  req.body.admin = req.currentUser;
  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
}

function showRoute(req,res,next){
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(next);
}

function updateRoute(req,res,next){
  Event.findById(req.params.id)
    .then(event => Object.assign(event, req.body))
    .then(event => event.save())
    .catch(next);
}

function deleteRoute(req,res,next){
  Event.findById(req.params.id)
    .then(event => event.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
