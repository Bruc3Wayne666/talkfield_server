const Router = require('express')
const router = new Router()
const postController = require('../controllers/postController')


router.get('/news/:userId', postController.getAllNews)
router.get('/profile/:userId', postController.getAllPosts)
router.get('/:id', postController.getOne)
router.post('/', postController.add)
router.put('/:id', postController.update)
router.delete('/:id', postController.delete)
router.put('/:id/like', postController.like)


module.exports = router