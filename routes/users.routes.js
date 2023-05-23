const router = require('express').Router();
const usersControllers = require('../controllers/users.controllers');

router.get('/', usersControllers.getUsers);
router.get('/:id', usersControllers.getUser);
router.post('/', usersControllers.createUser);
router.patch('/me', usersControllers.patchUserInfo);
router.patch('/me/avatar', usersControllers.patchUserAvatar);

module.exports = router;
