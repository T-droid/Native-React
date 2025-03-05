import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
  res.send('Get all subscriptions');
});

subscriptionRouter.post('/', (req, res) => {
  res.send('Create subscription');
});

subscriptionRouter.get('/:id', (req, res) => {
  res.send('Get subscription by id');
});

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