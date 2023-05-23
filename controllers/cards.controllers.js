const CastError = require('mongoose/lib/error/cast');
const ValidationError = require('mongoose/lib/error/validation');
const Card = require('../models/card');
const { CARD_NOT_FOUND, CREATED_CODE, NO_RIGHTS } = require('../utils/constants');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports.createCard = async (req, res, next) => {
  try {
    const card = await Card.create({ ...req.body, owner: req.user._id });
    res.status(CREATED_CODE).send({ data: card });
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) throw new NotFoundError();
    if (card.owner.id !== req.user._id) throw new ForbiddenError(NO_RIGHTS);
    await card.deleteOne();
    res.send({ data: card });
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

async function changeLikeState(action, req, res, next) {
  try {
    const card = await Card.findByIdAndUpdate(req.params.cardId, {
      [action]: { likes: req.user._id },
    }, {
      new: true,
      runValidators: true,
    });
    if (!card) throw new NotFoundError(CARD_NOT_FOUND);
    res.send(card);
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
}

module.exports.likeCard = function (req, res, next) {
  return changeLikeState('$addToSet', req, res, next);
};
module.exports.dislikeCard = function (req, res, next) {
  return changeLikeState('$pull', req, res, next);
};
