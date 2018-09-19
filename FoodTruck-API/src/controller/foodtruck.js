import mongoose from 'mongoose';
import { Router} from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';
import { authenticate } from '../middleware/authMiddleware';

export default({ config, db}) => {
    let api = Router();

    // CRUD - Create, Reade, Update, Delete
    // '/v1/foodtruck/add'
    api.post('/add', authenticate, (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodtype = req.body.foodtype;
        newFoodTruck.avgcost = req.body.avgcost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;


        newFoodTruck.save(err => {
            if(err)res.send(err)
            res.json({message: 'Food Truck saved successfully'});
        });
    });

    // '/v1/foodtruck/' - Read
    api.get('/', authenticate, (req, res) => {
        FoodTruck.find({}, (err, foodtrucks) => {
            if(err) res.send(err);
            res.json(foodtrucks);
        });
    });

     // '/v1/foodtruck/:id' - Read 1
     api.get('/:id', (req, res) => {
         FoodTruck.findById(req.params.id, (err, foodtruck) => {
             if(err) res.send(err);
             res.json(foodtruck);
         });
     });

     // '/v1/foodtruck/:id' - Update
     api.put('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if(err) res.send(err);
            foodtruck.name = req.body.name;
            foodtruck.foodtype = req.body.foodtype;
            foodtruck.avgcost = req.body.avgcost;
            foodtruck.geometry.coordinates = req.body.geometry.coordinates;
            foodtruck.save(err => {
                if(err) res.send(err)
                res.json({message: "Food Truck is updated"});
            });
        });
     });

    // '/v1/foodtruck/:id' - DELETE - remove a food truck
    api.delete('/:id', (req, res) => {
        FoodTruck.remove({_id: req.params.id}, (err, foodtruck) => {
            if (err) res.send(err);
            Review.remove({ foodtruck: req.params.id}, (err, review) => {
                if (err) res.send(err);
                res.json({message: "Food Truck and Reviews Successfully Removed"});
            });
        });
    });

     // add review for a specific food truck id
     // /v1/foodtruck/reviews/add/:id
     api.post('/reviews/add/:id', (req, res) => {
         FoodTruck.findById(req.params.id, (err, foodtruck) => {
             if(err) res.send(err);
             let newReveiw = new Review();
             newReveiw.title = req.body.title;
             newReveiw.text = req.body.text;
             newReveiw.foodtruck = foodtruck._id;
             newReveiw.save((err, review) => {
                 if(err) res.send(err)
                 foodtruck.reviews.push(newReveiw);
                 foodtruck.save(err => {
                     if(err) res.send(err)
                     res.json({message: 'Food truck review saved!'});
                 });
             });
         });
     });

     // get review for specific food truck id
     // '/v1/foodtruck/reviews/:id'
     api.get('/reviews/:id', (req, res) => {
         Review.find({foodtruck: req.params.id}, (err, reviews) => {
             if(err) res.send(err);
             res.json(reviews);
         });
     });
    return api;
}