const express = require('express');
const color = require('colors')
const dotenv = require('dotenv').config();
const cors = require('cors')
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')

connectDB()
const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/notes', require('./routes/noteRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use(errorHandler)
app.listen(port, () =>
{
    console.log(`Server started on port ${port}`)
})