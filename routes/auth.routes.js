const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser, login } = require('../controllers/auth.controllers');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
  }),
}), login);

module.exports = router;
