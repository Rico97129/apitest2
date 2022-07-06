var express = require('express');
var pizzaCtrl = require('./route/pizzaCtrl');

//Router

exports.router = (() => {
    var apiRouter = express.Router();

    //Pizza routes
    apiRouter.route('/pizzas/add').post(pizzaCtrl.addPizza);
    apiRouter.route('/pizzas/getPizza/').get(pizzaCtrl.getPizza);

})();

