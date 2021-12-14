import bodyParser from 'body-parser';
import express from 'express';
import tweetsRouter from './tweets.routes.js';
import userRouter from './users.routes.js'
import cors from 'cors'

const app = express()
let port = process.env.PORT || 3004


app.use(bodyParser.json())
app.use(cors())

app.use(tweetsRouter)
app.use(userRouter)

app.listen(port, () => console.log("listening on", port))

