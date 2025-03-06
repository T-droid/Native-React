import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
  res.send('Get all subscriptions');
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.get('/:id', authorize, getUserSubscription);

subscriptionRouter.put('/:id', (req, res) => {
  res.send('Update subscription');
});

subscriptionRouter.delete('/:id', (req, res) => {
  res.send('Delete subscription');
});

subscriptionRouter.get('/user/:id', (req, res) => {
  res.send('Get all subscriptions for user');
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send('Cancel subscription');
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send('Get upcoming renewals');
});

export default subscriptionRouter;