'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _FoodTruck = require('../model/FoodTruck');

var _FoodTruck2 = _interopRequireDefault(_FoodTruck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    // CRUD - Create, Reade, Update, Delete
    // '/v1/foodtruck/add'
    api.post('/add', function (req, res) {
        var newFoodTruck = new _FoodTruck2.default();
        newFoodTruck.name = req.body.name;

        newFoodTruck.save(function (err) {
            if (err) res.send(err);
            res.json({ message: 'Food Truck saved successfully' });
        });
    });

    // '/v1/foodtruck/' - Read
    api.get('/', function (req, res) {
        _FoodTruck2.default.find({}, function (err, foodtrucks) {
            if (err) res.send(err);
            res.json(foodtrucks);
        });
    });

    // '/v1/foodtruck/:id' - Read 1
    api.get('/:id', function (req, res) {
        _FoodTruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) res.send(err);
            res.json(foodtruck);
        });
    });

    // '/v1/foodtruck/:id' - Update
    api.put('/:id', function (req, res) {
        _FoodTruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) res.send(err);
            foodtruck.name = req.body.name;
            foodtruck.save(function (err) {
                if (err) res.send(err);
                res.json({ message: "Food Truck is updated" });
            });
        });
    });

    // '/v1/foodtruck/:id' - Delete
    api.delete('/:id', function (req, res) {
        _FoodTruck2.default.remove({
            _id: req.params.id
        }, function (err, foodtruck) {
            if (err) res.send(err);
            res.json({ message: "FoodTruck successfully removed" });
        });
    });

    return api;
};
//# sourceMappingURL=foodtruck.js.map