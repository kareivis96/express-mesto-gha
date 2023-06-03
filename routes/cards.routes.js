const router = require('express').Router();
const cardsControllers = require('../controllers/cards.controllers');
const { auth } = require('../middlewares/auth.middleware');

router.get('/', auth, cardsControllers.getCards);
router.post('/', auth, cardsControllers.createCard);
router.delete('/:cardId', auth, cardsControllers.deleteCard);
router.put('/:cardId/likes', auth, cardsControllers.likeCard);
router.delete('/:cardId/likes', auth, cardsControllers.dislikeCard);

module.exports = router;
