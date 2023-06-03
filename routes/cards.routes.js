const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const cardsControllers = require('../controllers/cards.controllers');

// const objectIDvalidator = celebrate({
//   params: {
//     id: Joi.string().length(24).hex(),
//   },
// });

router.get('/', cardsControllers.getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
  }),
}), cardsControllers.createCard);
router.delete('/:cardId', cardsControllers.deleteCard);
router.put('/:cardId/likes', cardsControllers.likeCard);
router.delete('/:cardId/likes', cardsControllers.dislikeCard);

module.exports = router;
