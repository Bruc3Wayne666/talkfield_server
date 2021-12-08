const Router = require('express')
const router = new Router()
const conversationController = require('../controllers/conversationController')

router.post('/', conversationController.create)
router.get('/:userId', conversationController.getAll)
router.get('/find/:firstId/:secondId', conversationController.getOne)


module.exports = router