const router = require('express').Router();

router.use('/users', require('./users.routes'));
router.use('/cards', require('./cards.routes'));

module.exports = router;
