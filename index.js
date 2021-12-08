const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const router = require("./routes/router");
const cors = require('cors')
const multer = require('multer')
const path = require('path')


dotenv.config()

app.use('/images', express.static(path.join(__dirname, 'public/images')))

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors({origin: '*'}))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully')
    } catch (err) {
        console.error(err)
    }
})

app.use('/api', router)


try {
    mongoose.connect(
        process.env.MONGO_URL,
        {useNewUrlParser: true, useUnifiedTopology: true},
        () => console.log("Connected to MongoDB")
    )

    app.listen(process.env.PORT, () => console.log(`Server has started on port ${process.env.PORT}`))
} catch (e) {
    console.log(e)
}



