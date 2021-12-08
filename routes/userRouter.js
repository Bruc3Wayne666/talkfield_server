const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.put('/:id', userController.update)
router.delete('/:id', userController.delete)
router.get('/:id', userController.getOne)
router.put('/:id/follow', userController.follow)
router.put('/:id/unfollow', userController.unfollow)
router.get('/friends/:id', userController.getFriends)

module.exports = router