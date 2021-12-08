const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const postRouter = require('./postRouter')
const conversationRouter = require('./conversationRouter')
const messageRouter = require('./messageRouter')

router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/post', postRouter)
router.use('/conversation', conversationRouter)
router.use('/message', messageRouter)

module.exports = router