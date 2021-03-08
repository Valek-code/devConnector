import express from 'express'
import dotenv from 'dotenv'
import connectToDB from './config/db.js'
import userRouter from './routes/api/users.js'
import authRouter from './routes/api/auth.js'
import profileRouter from './routes/api/profile.js'
import postsRouter from './routes/api/posts.js'
import cors from 'cors'
import path from 'path'

dotenv.config({path: './config/.env'})


const app = express();
app.use(express.json({extended: false}))
app.use(cors())

connectToDB();

const PORT = process.env.PORT;


// define routes

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postsRouter)
app.use('/api/profile', profileRouter)

// serve static assets in production

if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



app.listen(PORT, () => console.log(`Server started listening for requests at http://localhost:${PORT}`))
